import { ValidationError } from "@urbanix/error-handling";
import { isValidObjectId } from "mongoose";
import { MongoTenderRepository } from "../../infrastructure/database";
import { OfferService } from "../services/offer.service";

export class OfferEvents {
  private static _offer = new OfferService(new MongoTenderRepository());
  static async processOfferCreated(data: { id: string; tenderId: string }) {
    try {
      console.log("Processing OfferCreated event:", data);

      this.validateData(data);

      await this._offer.handleOfferCreatedEvent(data.id, data.tenderId);
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  static async processOfferDeleted(data: { id: string; tenderId: string }) {
    try {
      console.log("Processing OfferDeleted event:", data);

      this.validateData(data);

      await this._offer.handleOfferDeletedEvent(data.id, data.tenderId);
    } catch (err) {
      // Re-throw error for retry or DLQ handling
      throw err;
    }
  }

  private static validateData(data: { id: string; tenderId: string }) {
    if (!data.id || !isValidObjectId(data.id)) {
      throw new ValidationError("Invalid user data: offerId is required");
    }

    if (!data.tenderId || !isValidObjectId(data.tenderId)) {
      throw new ValidationError("Invalid user data: userId is required");
    }
  }
}
