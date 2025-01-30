import { publishEvent } from "@urbanix/rabbitmq";
import { IUser } from "../../domain/entities";
import { rabbitmqChannel } from "../../infrastructure/providers";

export class UserEvents {
  static async onUserCreated(user: IUser) {
    await publishEvent(
      await rabbitmqChannel(),
      "user_exchange",
      "user_created",
      { id: user._id, email: user.email },
      5,
      500
    );
  }

  static async onUserDeleted(user: IUser) {
    await publishEvent(await rabbitmqChannel(), "user_exchange", "user_deleted", { id: user._id }, 5, 500);
  }

  static async onUserTendersUpdated(user: IUser) {
    await publishEvent(
      await rabbitmqChannel(),
      "user_exchange",
      "user_tenders_updated",
      { id: user._id, tenders: user.entTenders },
      5,
      500
    );
  }

  static async onUserOffersUpdated(user: IUser) {
    await publishEvent(
      await rabbitmqChannel(),
      "user_exchange",
      "user_offers_updated",
      { id: user._id, offers: user.entOffers },
      5,
      500
    );
  }
}
