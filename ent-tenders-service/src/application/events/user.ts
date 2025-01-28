import { isValidObjectId, Schema } from "mongoose";

export class UserEvent {
  static async processUserCreated(data: { id: string; email: string }) {
    console.log("Processing UserCreated event:", data);
    try {
      this.validateId(data);

      // Save user to database
      console.log(`Saving user to database: ID=${data.id}, email=${data.email}`);

      console.log(`User ${data.id} created`);
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  static async processUserUpdated(data: { id: string; tenders: Schema.Types.ObjectId[] }) {
    console.log("Processing UserUpdated event:", data);
    try {
      this.validateId(data);

      // Update user in database
      console.log(`Updating user in database: ID=${data.id}, tenders=${data.tenders}`);

      console.log(`User ${data.id} updated`);
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  static async processUserDeleted(data: { id: string }) {
    console.log("Processing UserDeleted event:", data);
    try {
      this.validateId(data);

      // Delete user from database
      console.log(`Deleting user from database: ID=${data.id}`);

      console.log(`User ${data.id} deleted`);
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
