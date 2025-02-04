import { ExchangeTypes, publishEvent } from "@urbanix/rabbitmq";
import { IUser } from "../../domain/entities";
import { rabbitmqChannel } from "../../infrastructure/providers";

export class UserEvents {
  static async onUserCreated(user: IUser) {
    await publishEvent(
      await rabbitmqChannel(),
      "user_exchange",
      ExchangeTypes.topic,
      { id: user._id, email: user.email },
      "user.created"
    );
  }

  static async onUserDeleted(user: IUser) {
    await publishEvent(await rabbitmqChannel(), "user_exchange", ExchangeTypes.topic, { id: user._id }, "user.deleted");
  }

  static async onUserTendersUpdated(user: IUser) {
    await publishEvent(
      await rabbitmqChannel(),
      "user_exchange",
      ExchangeTypes.topic,
      { id: user._id, tenders: user.entTenders },
      "user.tenders.updated"
    );
  }

  static async onUserOffersUpdated(user: IUser) {
    await publishEvent(
      await rabbitmqChannel(),
      "user_exchange",
      ExchangeTypes.topic,
      { id: user._id, offers: user.entOffers },
      "user.offers.updated"
    );
  }
}
