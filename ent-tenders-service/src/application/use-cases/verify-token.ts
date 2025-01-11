import { jwks } from "../../infrastructure/providers";
import { decode, verify } from "jsonwebtoken";

export class VerifyTokenUseCase {
  static async execute(token: string) {
    const decodedHeader = decode(token, { complete: true });
    if (!decodedHeader) {
      throw "No token provided";
    }
    const kid = decodedHeader.header.kid;

    const key = await jwks.getSigningKey(kid);
    const publicKey = key.getPublicKey();

    if (!key) {
      throw new Error("Invalid token signature");
    }

    // Verify token
    // Any because there's no type for cognito jwt
    const decoded = verify(token, publicKey, { algorithms: ["RS256"] }) as any;
    if (!decoded) {
      throw new Error("Invalid token");
    }
    return decoded.username;
  }
}
