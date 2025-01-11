import { IUserRepository } from "../../domain/repositories";

export class CreateTenderService {
  private _userRepo: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepo = userRepository;
  }

  async execute() {}
}
