import { SignupParams } from "../../core/types";
import { IUserRepository } from "../../domain/repositories";
import { User } from "../../infrastructure/orm";
import { AwsCognitoProvider } from "../../infrastructure/providers";
import { UserEvents } from "../events";

export class UserSignupService {
  private _userRepo: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepo = userRepository;
  }

  async execute(user: SignupParams) {
    // Call AWS Cognito for signup
    await AwsCognitoProvider.signup(user);

    // Save user to the repository
    const newUser = await this._userRepo.create({ ...user, companyName: user.companyName || user.officeName });

    await UserEvents.onUserCreated(newUser);

    return newUser;
  }
}
