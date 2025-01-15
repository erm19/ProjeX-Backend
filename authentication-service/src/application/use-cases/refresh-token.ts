import { AwsCognitoProvider } from "../../infrastructure/providers";
import { RefreshParams } from "../../core/types";

export class RefreshTokenUseCase {
  static async execute(params: RefreshParams) {
    const authResponse = await AwsCognitoProvider.refresh(params);

    return { accessToken: authResponse.AccessToken, idToken: authResponse.IdToken };
  }
}
