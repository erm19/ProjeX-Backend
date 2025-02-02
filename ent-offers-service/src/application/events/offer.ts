import { publishEvent } from "@urbanix/rabbitmq";
import { rabbitmqChannel } from "../../infrastructure/providers";
import { IOffer } from "../../domain/entities";

export class OfferEvent {
  static async onOfferCreated(offer: IOffer) {
    await publishEvent(await rabbitmqChannel(), "offer_exchange", "ent_offer_created", { id: offer._id }, 5, 500);
  }

  static async onOfferDeleted(offer: IOffer) {
    await publishEvent(await rabbitmqChannel(), "offer_exchange", "ent_offer_deleted", { id: offer._id }, 5, 500);
  }
}
