import { UserService } from "../services";

export class LogoutUserUseCase {
  static async execute(token: string, userService: UserService) {
    return await userService.logout(token);
  }
}
