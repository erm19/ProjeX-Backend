import { MongoOfferRepository } from "../../infrastructure/database";
import { MongoTenderRepository } from "../../infrastructure/database/mongo-tender.repository";
import { TenderService } from "../services";

export class TenderEvents {
  private static _tenderService = new TenderService(new MongoTenderRepository(), new MongoOfferRepository());

  static async processTenderCreated(data: { tenderId: string }) {
    console.log("Processing TenderCreated event:", data);

    try {
      this.validateData(data);

      await this._tenderService.handleCreatedEvent(data);
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  static async processTenderDeleted(data: { tenderId: string }) {
    console.log("Processing TenderDeleted event:", data);

    try {
      this.validateData(data);

      await this._tenderService.handleDeletedEvent(data);
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  private static validateData(data: { tenderId: string }) {
    if (!data.tenderId) {
      throw new Error("Invalid tender data: tenderId is required");
    }
  }
}
