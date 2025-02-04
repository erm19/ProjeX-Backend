import { Channel } from "amqplib";
import { InternalServerError } from "@urbanix/error-handling";
import { Exchanges } from "./utils/types";

export async function consumeEvents(
  channel: Channel,
  queueName: string,
  exchange: string,
  exchangeType: Exchanges,
  handleEvent: (data: any) => Promise<void>,
  routingKey = "",
  options: { retryDelayMs?: number; maxRetries?: number; dlqName?: string } = {}
) {
  const { retryDelayMs = 1000, maxRetries = 5, dlqName } = options;

  try {
    await channel.assertExchange(exchange, exchangeType, { durable: true });
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchange, routingKey);

    console.log(`Waiting for messages in queue: ${queueName}`);

    channel.consume(queueName, async (message) => {
      if (message) {
        const headers = message.properties.headers || {};
        const retryCount = (headers["x-retry-count"] || 0) + 1;
        const data = JSON.parse(message.content.toString());

        try {
          await handleEvent(data); // Process the event
          channel.ack(message); // Acknowledge message
        } catch (err) {
          console.error("Error handling message:", err);

          if (retryCount <= maxRetries) {
            console.log(`Retrying message from queue: ${queueName}, attempt ${retryCount}/${maxRetries}`);

            // Requeue the message with updated retry count
            channel.sendToQueue(queueName, message.content, {
              persistent: true,
              headers: { "x-retry-count": retryCount },
            });
          } else if (dlqName) {
            await channel.assertQueue(dlqName, { durable: true });
            console.log(`Sending message to DLQ: ${dlqName} after ${maxRetries} failed attempts`);
            channel.sendToQueue(dlqName, message.content, { persistent: true });
          }

          channel.ack(message); // Acknowledge the original message regardless of retry or DLQ
        }
      }
    });
  } catch (error) {
    console.log("error in consuming events", error);
    throw new InternalServerError(`Failed to consume events from queue: ${queueName}`);
  }
}
