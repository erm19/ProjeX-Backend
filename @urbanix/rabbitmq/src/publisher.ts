import { InternalServerError } from "@urbanix/error-handling";
import { Channel } from "amqplib";
import { Exchanges } from "./utils/types";

export async function publishEvent(
  channel: Channel,
  exchange: string,
  exchangeType: Exchanges,
  data: any,
  routingKey: string = "",
  maxRetries = 5,
  delayMs = 1000
) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      await channel.assertExchange(exchange, exchangeType, { durable: true });
      const success = channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(data)), { persistent: true });
      if (!success) throw new InternalServerError("Failed to publish message");

      console.log(
        `Message published to ${exchange}, type: ${exchangeType} ${routingKey ? `with routingKey: ${routingKey}` : ""}`
      );
      return;
    } catch (error) {
      console.error(`Publish attempt ${retries + 1} failed:`, error);
      retries++;
      await new Promise((resolve) => setTimeout(resolve, delayMs * Math.pow(2, retries)));
    }
  }
  console.error(`Failed to publish message after ${maxRetries} attempts.`);
}
