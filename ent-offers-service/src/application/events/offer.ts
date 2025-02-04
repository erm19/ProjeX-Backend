import { ExchangeTypes, publishEvent } from "@urbanix/rabbitmq";
import { rabbitmqChannel } from "../../infrastructure/providers";
import { IOffer } from "../../domain/entities";

export class OfferEvent {
  static async onOfferCreated(offer: IOffer) {
    await publishEvent(
      await rabbitmqChannel(),
      "offer_exchange",
      ExchangeTypes.topic,
      { id: offer._id },
      "ent-offer.created"
    );
  }

  static async onOfferDeleted(offer: IOffer) {
    await publishEvent(
      await rabbitmqChannel(),
      "offer_exchange",
      ExchangeTypes.topic,
      { id: offer._id },
      "ent-offer.deleted"
    );
  }
}
