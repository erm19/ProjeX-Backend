import { consumeEvents, ExchangeTypes } from "@urbanix/rabbitmq";
import { EntOfferEvents, EntTenderEvents } from "../../application/events";
import { rabbitmqChannel } from "../providers";

export async function initializeEventHandlers() {
  const channel = await rabbitmqChannel();
  const exchanges = { tender: "tender_exchange", offer: "offer_exchange" } as const;
  const getQueueName = (name: string) => `users.${name}`;

  await consumeEvents(
    channel,
    getQueueName("ent_tender_created"),
    exchanges.tender,
    ExchangeTypes.topic,
    EntTenderEvents.processTenderCreated,
    "*.created",
    { retryDelayMs: 2000, maxRetries: 3, dlqName: "tender_created_dlq" }
  );

  await consumeEvents(
    channel,
    getQueueName("ent_tender_deleted"),
    exchanges.tender,
    ExchangeTypes.topic,
    EntTenderEvents.processTenderDeleted,
    "*.deleted",
    { retryDelayMs: 2000, maxRetries: 3, dlqName: "tender_deleted_dlq" }
  );

  await consumeEvents(
    channel,
    getQueueName("ent_offer_created"),
    exchanges.offer,
    ExchangeTypes.topic,
    EntOfferEvents.processOfferCreated,
    "*.created",
    { retryDelayMs: 2000, maxRetries: 3, dlqName: "offer_created_dlq" }
  );

  await consumeEvents(
    channel,
    getQueueName("ent_offer_deleted"),
    exchanges.offer,
    ExchangeTypes.topic,
    EntOfferEvents.processOfferDeleted,
    "*.deleted",
    { retryDelayMs: 2000, maxRetries: 3, dlqName: "offer_deleted_dlq" }
  );
}
