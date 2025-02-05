import { NotFoundError } from "@urbanix/error-handling";
import { UserEvents } from "../events/user";
import mongoose, { Schema } from "mongoose";
import { IUserRepository } from "../../domain/repositories";

export class UserEntOfferService {
  private _userRepo: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepo = userRepository;
  }

  async handleOfferCreatedEvent(offerId: string, userId: string) {
    const user = await this.findUserById(userId);

    const userOffers = user.entOffers || [];

    const offerIndex = userOffers.findIndex((offer) => offer.toString() === offerId);

    if (offerIndex === -1) {
      // Example logic: Save user to database
      console.log(`Saving user to local database: ID=${offerId}, userId=${userId}`);

      userOffers.push(new mongoose.Types.ObjectId(offerId) as unknown as Schema.Types.ObjectId);
      await this._userRepo.updateOffers(user, userOffers);
    }

    console.log(`User ${userId} updated with offer ${offerId}`);

    // 2. Publish a UserUpdated event
    await UserEvents.onUserOffersUpdated(user);

    console.log(`UserUpdated event published for user ${userId}`);
  }

  async handleOfferDeletedEvent(offerId: string, userId: string) {
    const user = await this._userRepo.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const userOffers = user.entOffers || [];

    const offerIndex = userOffers.findIndex((offer) => offer.toString() === offerId);

    if (offerIndex !== -1) {
      userOffers.splice(offerIndex, 1);
      await this._userRepo.updateOffers(user, userOffers);
    }

    await UserEvents.onUserOffersUpdated(user);
  }

  private async findUserById(userId: string) {
    const user = await this._userRepo.findById(userId);

    if (!user) {
      throw new NotFoundError(`User not found: ${userId}`);
    }

    return user;
  }
}
