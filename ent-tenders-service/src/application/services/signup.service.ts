import { SignupParams } from "../../core/types";
import { IUserRepository } from "../../domain/repositories";
import { AwsCognitoProvider } from "../../infrastructure/providers";

export class UserSignupService {
  private _userRepo: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepo = userRepository;
  }

  async execute(user: SignupParams) {
    // Call AWS Cognito for signup
    await AwsCognitoProvider.signup(user);

    // Save user to the repository
    return this._userRepo.create(user);
  }
}
