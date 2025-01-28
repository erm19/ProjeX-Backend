import { NotFoundError } from "@urbanix/error-handling";
import { IUserRepository } from "../../domain/repositories";
import { UserEvents } from "../events/user";
import { Schema } from "mongoose";

export class UserEntTenderService {
  private _userRepo: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepo = userRepository;
  }

  async handleTenderCreatedEvent(tenderId: string, userId: string) {
    const user = await this.findUserById(userId);

    const userTenders = user.entTenders || [];

    const tenderIndex = userTenders.findIndex((tender) => tender.toString() === tenderId);

    if (tenderIndex === -1) {
      // Example logic: Save user to database
      console.log(`Saving user to local database: ID=${tenderId}, userId=${userId}`);

      userTenders.push(new Schema.Types.ObjectId(tenderId));
      await this._userRepo.updateTenders(user, userTenders);
    }

    console.log(`User ${userId} updated with tender ${tenderId}`);

    // 2. Publish a UserUpdated event
    await UserEvents.onUserTendersUpdated(user);

    console.log(`UserUpdated event published for user ${userId}`);
  }

  async handleTenderDeletedEvent(tenderId: string, userId: string) {
    const user = await this._userRepo.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const userTenders = user.entTenders || [];

    const tenderIndex = userTenders.findIndex((tender) => tender.toString() === tenderId);

    if (tenderIndex !== -1) {
      userTenders.splice(tenderIndex, 1);
      await this._userRepo.updateTenders(user, userTenders);
    }

    await UserEvents.onUserTendersUpdated(user);
  }

  private async findUserById(userId: string) {
    const user = await this._userRepo.findById(userId);

    if (!user) {
      throw new NotFoundError(`User not found: ${userId}`);
    }

    return user;
  }
}
