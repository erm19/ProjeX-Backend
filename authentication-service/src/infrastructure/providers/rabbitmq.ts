import { createRabbitMQChannel } from "@urbanix/rabbitmq";

export const rabbitmqChannel = createRabbitMQChannel(process.env.RABBITMQ_URL || "amqp://localhost");
