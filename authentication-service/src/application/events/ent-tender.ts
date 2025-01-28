import { NotFoundError, ValidationError } from "@urbanix/error-handling";
import { MongoUserRepository } from "../../infrastructure/database";
import { isValidObjectId, Schema, Types } from "mongoose";

export class EntTenderEvents {
  private static _userRepo = new MongoUserRepository();
  static async processTenderCreated(data: { id: string; userId: string }) {
    try {
      console.log("Processing UserCreated event:", data);

      this.validateData(data);

      const user = await this.findUserById(data.userId);

      const userTenders = user.tenders || [];

      const tenderIndex = userTenders.findIndex((tender) => tender.toString() === data.id);

      if (tenderIndex === -1) {
        // Example logic: Save user to database
        console.log(`Saving user to local database: ID=${data.id}, userId=${data.userId}`);

        userTenders.push(new Schema.Types.ObjectId(data.id));
        user.tenders = userTenders;
        await user.save();
      }
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  static async processTenderDeleted(data: { id: string; userId: string }) {
    try {
      console.log("Processing UserDeleted event:", data);

      this.validateData(data);

      const user = await this.findUserById(data.userId);

      const userTenders = user.tenders || [];

      const tenderIndex = userTenders.findIndex((tender) => tender.toString() === data.id);

      if (tenderIndex !== -1) {
        // Example logic: Remove user from database
        console.log(`Removing user from local database: ID=${data.id}, userId=${data.userId}`);

        userTenders.splice(tenderIndex, 1);
        user.tenders = userTenders;
        await user.save();
      }
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

  private static async findUserById(userId: string) {
    const user = await this._userRepo.findById(userId);

    if (!user) {
      throw new NotFoundError(`User not found: ${userId}`);
    }

    return user;
  }
}
