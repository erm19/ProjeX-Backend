import { LoginParams } from "../../core/types";
import { AwsCognitoProvider } from "../../infrastructure/providers";

export class LoginUserUseCase {
  static async execute(params: LoginParams) {
    const authResponse = await AwsCognitoProvider.login(params);

    return {
      accessToken: authResponse.AccessToken,
      idToken: authResponse.IdToken,
      refreshToken: authResponse.RefreshToken,
    };
  }
}
