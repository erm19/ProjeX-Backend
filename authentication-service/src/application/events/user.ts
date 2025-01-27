import { publishEvent } from "@urbanix/rabbitmq";
import { IUser } from "../../domain/entities";
import { rabbitmqChannel } from "../../infrastructure/providers";

export class UserEvents {
  static onUserCreated(user: IUser) {
    publishEvent(rabbitmqChannel, "user_created", { id: user._id, email: user.email });
  }

  static onUserDeleted(user: IUser) {
    publishEvent(rabbitmqChannel, "user_deleted", { id: user._id });
  }
}
