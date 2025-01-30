import { publishEvent } from "@urbanix/rabbitmq";
import { rabbitmqChannel } from "../../infrastructure/providers";

export class TenderEvents {
  static async onTenderCreated(data: { id: string; userId: string }) {
    try {
      await publishEvent(await rabbitmqChannel(), "tender_created", { id: data.id, userId: data.userId });
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }

  static async onTenderDeleted(data: { id: string; userId: string }) {
    try {
      await publishEvent(await rabbitmqChannel(), "tender_deleted", { id: data.id, userId: data.userId });
    } catch (err) {
      throw err; // Re-throw error for retry or DLQ handling
    }
  }
}
