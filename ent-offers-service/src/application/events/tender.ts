import { MongoOfferRepository } from "../../infrastructure/database";
import { MongoTenderRepository } from "../../infrastructure/database/mongo-tender.repository";
import { TenderService } from "../services";

export class TenderEvents {
  private static _tenderService = new TenderService(new MongoTenderRepository(), new MongoOfferRepository());

  static async processTenderCreated(data: { id: string; questionnaire: string[] }) {
    console.log("Processing TenderCreated event:", data);

    try {
      TenderEvents.validateData(data);

      await TenderEvents._tenderService.handleCreatedEvent(data);
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  static async processTenderDeleted(data: { id: string }) {
    console.log("Processing TenderDeleted event:", data);

    try {
      TenderEvents.validateData(data);

      await TenderEvents._tenderService.handleDeletedEvent(data);
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  private static validateData(data: { id: string }) {
    if (!data.id) {
      throw new Error("Invalid tender data: id is required");
    }
  }
}
