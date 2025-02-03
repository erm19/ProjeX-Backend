import { Channel } from "amqplib";
import { InternalServerError } from "@urbanix/error-handling";

export async function consumeEvents(
  channel: Channel,
  queueName: string,
  handleEvent: (data: any) => Promise<void>,
  options: { retryDelayMs?: number; maxRetries?: number; dlqName?: string; exchange?: string; routingKey?: string } = {}
) {
  const { retryDelayMs = 1000, maxRetries = 5, dlqName, exchange, routingKey } = options;

  try {
    await channel.assertQueue(queueName, { durable: true });

    if (exchange && routingKey) {
      await channel.assertExchange(exchange, "direct", { durable: true });
      await channel.bindQueue(queueName, exchange, routingKey);
    }

    if (dlqName) {
      await channel.assertQueue(dlqName, { durable: true });
    }

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
