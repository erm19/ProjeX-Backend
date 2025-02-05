import { UserService } from "../services";

export class VerifyTokenUseCase {
  static async execute(token: string, userService: UserService) {
    return await userService.verify(token);
  }
}
