import { AuthorizationError, InternalServerError, NotFoundError, ValidationError } from "@urbanix/error-handling";
import { decode, verify } from "jsonwebtoken";
import { LoginParams, RefreshParams, SignupParams } from "../../core/types";
import { IUserRepository } from "../../domain/repositories";
import { AwsCognitoProvider, jwks } from "../../infrastructure/providers";
import { UserEvents } from "../events";

export class UserService {
  constructor(private _userRepo: IUserRepository) {}

  async signup(user: SignupParams) {
    // Call AWS Cognito for signup
    await AwsCognitoProvider.signup(user);

    // Save user to the repository
    const newUser = await this._userRepo.create({ ...user, companyName: user.companyName || user.officeName });

    await UserEvents.onUserCreated(newUser);

    return newUser;
  }

  async login(params: LoginParams) {
    const authResponse = await AwsCognitoProvider.login(params);

    return {
      accessToken: authResponse.AccessToken,
      idToken: authResponse.IdToken,
      refreshToken: authResponse.RefreshToken,
    };
  }

  async logout(token: string) {
    return await AwsCognitoProvider.logout(token);
  }

  async refresh(params: RefreshParams) {
    const authResponse = await AwsCognitoProvider.refresh(params);

    return { accessToken: authResponse.AccessToken, idToken: authResponse.IdToken };
  }

  async verify(token: string) {
    const decodedHeader = decode(token, { complete: true });
    if (!decodedHeader) {
      throw new ValidationError("No Token Provided");
    }
    const kid = decodedHeader.header.kid;

    const key = await jwks.getSigningKey(kid);
    const publicKey = key.getPublicKey();

    if (!key) {
      throw new InternalServerError("Invalid token signature");
    }

    // Verify token
    // Any because there's no type for cognito jwt
    const decoded = verify(token, publicKey, { algorithms: ["RS256"] }) as any;
    if (!decoded) {
      throw new AuthorizationError("Invalid Token");
    }
    return decoded.username;
  }

  async authorized(roles: string | string[], token: string) {
    const username = await this.verify(token);

    const user = await this._userRepo.findByEmail(username);

    if (!user) throw new NotFoundError("User Not Found");

    let isAuthorized = false;

    if (typeof roles === "string") {
      isAuthorized = roles === user.role;
    } else {
      isAuthorized = roles.some((role) => role === user.role);
    }

    return { username, isAuthorized };
  }
}
