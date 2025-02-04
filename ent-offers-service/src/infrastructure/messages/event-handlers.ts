import { consumeEvents, ExchangeTypes } from "@urbanix/rabbitmq";
import { rabbitmqChannel } from "../providers";
import { TenderEvents, UserEvents } from "../../application/events";

export async function initializeEventHandlers() {
  const channel = await rabbitmqChannel();
  const exchanges = { tender: "tender_exchange", user: "user_exchange" } as const;
  const getQueueName = (name: string) => `ent_offers.${name}`;

  await consumeEvents(
    channel,
    getQueueName("tender_created"),
    exchanges.tender,
    ExchangeTypes.topic,
    TenderEvents.processTenderCreated,
    "*.created",
    { retryDelayMs: 2000, maxRetries: 3, dlqName: getQueueName("tender_created_dlq") }
  );

  await consumeEvents(
    channel,
    getQueueName("tender_deleted"),
    exchanges.tender,
    ExchangeTypes.topic,
    TenderEvents.processTenderDeleted,
    "*.deleted",
    { retryDelayMs: 2000, maxRetries: 3, dlqName: getQueueName("tender_deleted_dlq") }
  );

  await consumeEvents(
    channel,
    getQueueName("user_created"),
    exchanges.user,
    ExchangeTypes.topic,
    UserEvents.processUserCreated,
    "*.created",
    { retryDelayMs: 2000, maxRetries: 3, dlqName: getQueueName("user_created_dlq") }
  );

  await consumeEvents(
    channel,
    getQueueName("user_deleted"),
    exchanges.user,
    ExchangeTypes.topic,
    UserEvents.processUserDeleted,
    "*.deleted",
    { retryDelayMs: 2000, maxRetries: 3, dlqName: getQueueName("user_deleted_dlq") }
  );

  await consumeEvents(
    channel,
    getQueueName("offers_updated"),
    exchanges.user,
    ExchangeTypes.topic,
    UserEvents.processUserUpdated,
    "*.offers.updated",
    { retryDelayMs: 2000, maxRetries: 3, dlqName: getQueueName("user_offers_updated_dlq") }
  );
}
