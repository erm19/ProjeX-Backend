import { UserService } from "../services";

export class UserAuthorizationUseCase {
  constructor(private _userService: UserService) {}

  async execute(token: string, roles: string | string[]) {
    return await this._userService.authorized(roles, token);
  }
}
