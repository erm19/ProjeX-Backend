import { createRabbitMQChannel } from "@urbanix/rabbitmq";

export const rabbitmqChannel = async () => await createRabbitMQChannel(process.env.RABBITMQ_URL || "amqp://localhost");
