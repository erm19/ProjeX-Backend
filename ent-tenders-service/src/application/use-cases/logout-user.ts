import { AwsCognitoProvider } from "../../infrastructure/providers";

export class LogoutUserUseCase {
  static async execute(token: string) {
    return await AwsCognitoProvider.logout(token);
  }
}
