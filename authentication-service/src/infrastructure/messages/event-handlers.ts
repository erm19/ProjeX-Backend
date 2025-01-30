import { consumeEvents } from "@urbanix/rabbitmq";
import { EntOfferEvents, EntTenderEvents } from "../../application/events";
import { rabbitmqChannel } from "../providers";

export async function initializeEventHandlers() {
  const channel = await rabbitmqChannel();
  await consumeEvents(channel, "ent_tender_created", EntTenderEvents.processTenderCreated, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "tender_created_dlq",
  });

  await consumeEvents(channel, "ent_tender_deleted", EntTenderEvents.processTenderDeleted, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "tender_deleted_dlq",
  });

  await consumeEvents(channel, "ent_offer_created", EntOfferEvents.processOfferCreated, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "offer_created_dlq",
  });

  await consumeEvents(channel, "ent_offer_deleted", EntOfferEvents.processOfferDeleted, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "offer_deleted_dlq",
  });
}
