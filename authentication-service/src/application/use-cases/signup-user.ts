import { SignupParams } from "../../core/types";
import { UserService } from "../services";

export class SignupUserUseCase {
  constructor(private _users: UserService) {}

  async execute(user: SignupParams) {
    // Leverage the application service
    return await this._users.signup(user);
  }
}
