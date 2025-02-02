import { InternalServerError } from "@urbanix/error-handling";
import { connect, Connection, Channel } from "amqplib";

let connection: Connection | null = null;

// Create or reuse a RabbitMQ connection
export async function getRabbitMQConnection(url: string): Promise<Connection> {
  try {
    if (!connection) {
      connection = await connect(url); // Replace with actual RabbitMQ URL
    }
    console.log(`RabbitMQ connection established at ${url}`);
    return connection;
  } catch (error) {
    throw new InternalServerError("Failed to create RabbitMQ connection");
  }
}

// Create a channel from the connection
export async function createRabbitMQChannel(url: string): Promise<Channel> {
  try {
    const connection = await getRabbitMQConnection(url);
    const channel = await connection.createChannel();
    if (typeof channel.assertQueue !== "function") {
      throw new InternalServerError("Invalid RabbitMQ channel");
    }
    return channel;
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Failed to create RabbitMQ channel");
  }
}
