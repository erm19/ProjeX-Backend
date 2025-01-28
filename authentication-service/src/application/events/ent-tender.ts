import { ValidationError } from "@urbanix/error-handling";
import { MongoUserRepository } from "../../infrastructure/database";
import { isValidObjectId } from "mongoose";
import { UserEntTenderService } from "../services/user-ent-tender.service";

export class EntTenderEvents {
  private static _userTenders = new UserEntTenderService(new MongoUserRepository());
  static async processTenderCreated(data: { id: string; userId: string }) {
    try {
      console.log("Processing TenderCreated event:", data);

      this.validateData(data);

      await this._userTenders.handleTenderCreatedEvent(data.id, data.userId);
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  static async processTenderDeleted(data: { id: string; userId: string }) {
    try {
      console.log("Processing TenderDeleted event:", data);

      this.validateData(data);

      await this._userTenders.handleTenderDeletedEvent(data.id, data.userId);
    } catch (err) {
      // Re-throw error for retry or DLQ handling
      throw err;
    }
  }

  private static validateData(data: { id: string; userId: string }) {
    if (!data.id || !isValidObjectId(data.id)) {
      throw new ValidationError("Invalid user data: tenderId is required");
    }

    if (!data.userId || !isValidObjectId(data.userId)) {
      throw new ValidationError("Invalid user data: userId is required");
    }
  }
}
