import { ExchangeTypes, publishEvent } from "@urbanix/rabbitmq";
import { IOffer } from "../../domain/entities";
import { rabbitmqChannel } from "../../infrastructure/providers";

export class OfferEvent {
  static async onOfferCreated(offer: IOffer) {
    await publishEvent(
      await rabbitmqChannel(),
      "offer_exchange",
      ExchangeTypes.topic,
      { id: offer._id, tenderId: offer.tenderId, userId: offer.creator },
      "ent-offer.created"
    );
  }

  static async onOfferDeleted(offer: IOffer) {
    await publishEvent(
      await rabbitmqChannel(),
      "offer_exchange",
      ExchangeTypes.topic,
      { id: offer._id, tenderId: offer.tenderId, userId: offer.creator },
      "ent-offer.deleted"
    );
  }
}
