import { consumeEvents, ExchangeTypes } from "@urbanix/rabbitmq";
import { rabbitmqChannel } from "../providers";
import { OfferEvents, UserEvents } from "../../application/events";

export async function initializeEventHandlers() {
  const channel = await rabbitmqChannel();
  const exchanges = { user: "user_exchange", offer: "offer_exchange" } as const;
  const getQueueName = (name: string) => `ent_tenders.${name}`;

  // Consume TenderCreated events
  await consumeEvents(
    channel,
    getQueueName("user_created"),
    exchanges.user,
    ExchangeTypes.topic,
    UserEvents.processUserCreated,
    "*.created",
    {
      retryDelayMs: 2000,
      maxRetries: 3,
      dlqName: getQueueName("user_created_dlq"),
    }
  );

  await consumeEvents(
    channel,
    getQueueName("tenders_updated"),
    exchanges.user,
    ExchangeTypes.topic,
    UserEvents.processUserUpdated,
    "*.tenders.updated",
    {
      retryDelayMs: 2000,
      maxRetries: 3,
      dlqName: getQueueName("user_tenders_updated_dlq"),
    }
  );

  await consumeEvents(
    channel,
    getQueueName("user_deleted"),
    exchanges.user,
    ExchangeTypes.topic,
    UserEvents.processUserDeleted,
    "*.deleted",
    {
      retryDelayMs: 2000,
      maxRetries: 3,
      dlqName: getQueueName("user_deleted_dlq"),
    }
  );

  await consumeEvents(
    channel,
    getQueueName("offer_created"),
    exchanges.offer,
    ExchangeTypes.topic,
    OfferEvents.processOfferCreated,
    "*.created",
    {
      retryDelayMs: 2000,
      maxRetries: 3,
      dlqName: getQueueName("offer_created_dlq"),
    }
  );

  await consumeEvents(
    channel,
    getQueueName("offer_deleted"),
    exchanges.offer,
    ExchangeTypes.topic,
    OfferEvents.processOfferDeleted,
    "*.deleted",
    {
      retryDelayMs: 2000,
      maxRetries: 3,
      dlqName: getQueueName("offer_deleted_dlq"),
    }
  );

  console.log("Event handlers initialized");
}
