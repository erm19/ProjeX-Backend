import { isValidObjectId, Schema } from "mongoose";
import { UserService } from "../services/user.service";
import { MongoUserRepository } from "../../infrastructure/database";

export class UserEvents {
  private static _userService = new UserService(new MongoUserRepository());
  static async processUserCreated(data: { id: string; email: string }) {
    console.log("Processing UserCreated event:", data);
    try {
      this.validateId(data);

      // Save user to database
      this._userService.handleCreatedEvent(data.id, data.email);
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  static async processUserUpdated(data: { id: string; tenders: Schema.Types.ObjectId[] }) {
    console.log("Processing UserUpdated event:", data);
    try {
      this.validateId(data);

      // Update user in database
      this._userService.handleUpdatedEvent(data.id, data.tenders);
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  static async processUserDeleted(data: { id: string }) {
    console.log("Processing UserDeleted event:", data);
    try {
      this.validateId(data);

      // Delete user from database
      this._userService.handleDeletedEvent(data.id);
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  private static validateId(data: { id: string }) {
    if (!data.id || !isValidObjectId(data.id)) {
      throw new Error("Invalid user data: id is required");
    }
  }
}
