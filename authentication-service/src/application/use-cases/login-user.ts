import { LoginParams } from "../../core/types";
import { UserService } from "../services";

export class LoginUserUseCase {
  static async execute(params: LoginParams, userService: UserService) {
    return await userService.login(params);
  }
}
