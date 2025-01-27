import { InternalServerError } from "@urbanix/error-handling";
import { connect, Connection } from "amqplib";

let connection: Connection | null = null;

// Create or reuse a RabbitMQ connection
export async function getRabbitMQConnection(url: string) {
  try {
    if (!connection) {
      connection = await connect(url); // Replace with actual RabbitMQ URL
    }
    return connection;
  } catch (error) {
    throw new InternalServerError("Failed to create RabbitMQ connection");
  }
}

// Create a channel from the connection
export async function createRabbitMQChannel(url: string) {
  try {
    const connection = await getRabbitMQConnection(url);
    return connection.createChannel();
  } catch (error) {
    throw new InternalServerError("Failed to create RabbitMQ channel");
  }
}
