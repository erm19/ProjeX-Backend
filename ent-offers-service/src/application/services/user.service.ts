import { Schema } from "mongoose";
import { IUserRepository } from "../../domain/repositories";

export class UserService {
  private _userRepo: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepo = userRepository;
  }

  async handleCreatedEvent(userId: string, email: string) {
    // Example logic: Save user to database
    console.log(`Saving user to database: ID=${userId}, email=${email}`);

    await this._userRepo.create(userId, email);

    console.log(`User ${userId} created`);
  }

  async handleUpdatedEvent(userId: string, offers: Schema.Types.ObjectId[]) {
    // Example logic: Update user in database
    console.log(`Updating user in database: ID=${userId}, offers=${offers}`);

    await this._userRepo.update(userId, offers);

    console.log(`User ${userId} updated`);
  }

  async handleDeletedEvent(userId: string) {
    // Example logic: Delete user from database
    console.log(`Deleting user from database: ID=${userId}`);

    await this._userRepo.delete(userId);

    console.log(`User ${userId} deleted`);
  }
}
