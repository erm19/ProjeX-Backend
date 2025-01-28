import { publishEvent } from "@urbanix/rabbitmq";
import { IUser } from "../../domain/entities";
import { rabbitmqChannel } from "../../infrastructure/providers";

export class UserEvents {
  static async onUserCreated(user: IUser) {
    await publishEvent(rabbitmqChannel, "user_created", { id: user._id, email: user.email });
  }

  static async onUserDeleted(user: IUser) {
    await publishEvent(rabbitmqChannel, "user_deleted", { id: user._id });
  }

  static async onUserTendersUpdated(user: IUser) {
    await publishEvent(rabbitmqChannel, "user_tenders_updated", { id: user._id, tenders: user.entTenders });
  }

  static async onUserOffersUpdated(user: IUser) {
    await publishEvent(rabbitmqChannel, "user_offers_updated", { id: user._id, offers: user.entOffers });
  }
}
