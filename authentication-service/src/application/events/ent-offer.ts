import { isValidObjectId, Schema } from "mongoose";
import { MongoUserRepository } from "../../infrastructure/database";
import { NotFoundError, ValidationError } from "@urbanix/error-handling";

export class EntOfferEvents {
  private static _userRepo = new MongoUserRepository();
  static async processOfferCreated(data: { id: string; userId: string }) {
    try {
      console.log("Processing OfferCreated event:", data);

      this.validateData(data);

      const user = await this.findUserById(data.userId);

      const userOffers = user.entOffers || [];

      const OfferIndex = userOffers.findIndex((offer) => offer.toString() === data.id);

      if (OfferIndex === -1) {
        // Example logic: Save user to database
        console.log(`Saving user to local database: ID=${data.id}, userId=${data.userId}`);

        userOffers.push(new Schema.Types.ObjectId(data.id));
        user.entOffers = userOffers;
        await user.save();
      }
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  static async processOfferDeleted(data: { id: string; userId: string }) {
    try {
      console.log("Processing OfferDeleted event:", data);

      this.validateData(data);

      const user = await this.findUserById(data.userId);

      const userOffers = user.entOffers || [];

      const offerIndex = userOffers.findIndex((offer) => offer.toString() === data.id);

      if (offerIndex !== -1) {
        // Example logic: Remove user from database
        console.log(`Removing user from local database: ID=${data.id}, userId=${data.userId}`);

        userOffers.splice(offerIndex, 1);
        user.entOffers = userOffers;
        await user.save();
      }
    } catch (err) {
      // Re-throw error for retry or DLQ handling
      throw err;
    }
  }

  private static validateData(data: { id: string; userId: string }) {
    if (!data.id || !isValidObjectId(data.id)) {
      throw new ValidationError("Invalid user data: OfferId is required");
    }

    if (!data.userId || !isValidObjectId(data.userId)) {
      throw new ValidationError("Invalid user data: userId is required");
    }
  }

  private static async findUserById(userId: string) {
    const user = await this._userRepo.findById(userId);

    if (!user) {
      throw new NotFoundError(`User not found: ${userId}`);
    }

    return user;
  }
}
