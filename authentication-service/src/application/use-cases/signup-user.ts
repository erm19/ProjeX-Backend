import { UserSignupService } from "../services";
import { SignupParams } from "../../core/types";
import { IUserRepository } from "../../domain/repositories";

export class SignupUserUseCase {
  private _userSignupService: UserSignupService;

  constructor(userRepository: IUserRepository) {
    this._userSignupService = new UserSignupService(userRepository);
  }

  async execute(user: SignupParams) {
    // Leverage the application service
    return await this._userSignupService.execute(user);
  }
}
