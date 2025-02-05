import { RefreshParams } from "../../core/types";
import { UserService } from "../services";

export class RefreshTokenUseCase {
  static async execute(params: RefreshParams, userService: UserService) {
    return await userService.refresh(params);
  }
}
