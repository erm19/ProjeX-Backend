import { Channel } from "amqplib";
import { InternalServerError } from "@urbanix/error-handling";

export async function consumeEvents(channel: Channel, queueName: string, handleEvent: (data: any) => Promise<void>) {
  try {
    await channel.assertQueue(queueName, { durable: true });
    console.log(`Waiting for messages in queue: ${queueName}`);

    channel.consume(queueName, async (message) => {
      if (message) {
        const data = JSON.parse(message.content.toString());
        try {
          await handleEvent(data); // Process the event
          channel.ack(message); // Acknowledge message
        } catch (err) {
          console.error("Error handling message:", err);
          channel.nack(message, false, false); // Reject without requeueing
          throw new InternalServerError("Error handling message");
        }
      }
    });
  } catch (error) {
    throw new InternalServerError(`Failed to consume events from queue: ${queueName}`);
  }
}
