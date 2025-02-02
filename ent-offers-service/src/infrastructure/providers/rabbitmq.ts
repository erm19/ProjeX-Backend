import { createRabbitMQChannel } from "@urbanix/rabbitmq";

export const rabbitmqChannel = async () => createRabbitMQChannel(process.env.RABBITMQ_URL || "amqp://localhost");
