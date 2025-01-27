import { InternalServerError } from "@urbanix/error-handling";
import { Channel } from "amqplib";

export async function publishEvent(channel: Channel, queueName: string, data: any) {
  try {
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });
    console.log(`Event published to queue: ${queueName}`, data);
  } catch (error) {
    throw new InternalServerError(`Failed to publish event to queue: ${queueName}`);
  }
}
