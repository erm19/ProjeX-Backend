import { isValidObjectId, Schema } from "mongoose";
import { MongoUserRepository } from "../../infrastructure/database";
import { ValidationError } from "@urbanix/error-handling";
import { UserEntOfferService } from "../services/user-ent-offer.service";

export class EntOfferEvents {
  private static _userEntOffers = new UserEntOfferService(new MongoUserRepository());
  static async processOfferCreated(data: { id: string; userId: string }) {
    try {
      console.log("Processing OfferCreated event:", data);

      EntOfferEvents.validateData(data);

      await EntOfferEvents._userEntOffers.handleOfferCreatedEvent(data.id, data.userId);
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  static async processOfferDeleted(data: { id: string; userId: string }) {
    try {
      console.log("Processing OfferDeleted event:", data);

      EntOfferEvents.validateData(data);

      await EntOfferEvents._userEntOffers.handleOfferDeletedEvent(data.id, data.userId);
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
}
