import { consumeEvents } from "@urbanix/rabbitmq";
import { rabbitmqChannel } from "../providers";
import { TenderEvents, UserEvents } from "../../application/events";

export async function initializeEventHandlers() {
  const channel = await rabbitmqChannel();

  await consumeEvents(channel, "ent_tender_created", TenderEvents.processTenderCreated, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "tender_created_dlq",
  });

  await consumeEvents(channel, "ent_tender_deleted", TenderEvents.processTenderDeleted, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "tender_deleted_dlq",
  });

  await consumeEvents(channel, "user_created", UserEvents.processUserCreated, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "user_created_dlq",
  });

  await consumeEvents(channel, "user_deleted", UserEvents.processUserDeleted, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "user_deleted_dlq",
  });

  await consumeEvents(channel, "user_offers_updated", UserEvents.processUserUpdated, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "user_offers_updated_dlq",
  });
}
