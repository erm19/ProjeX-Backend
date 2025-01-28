import { consumeEvents } from "@urbanix/rabbitmq";
import { rabbitmqChannel } from "../providers";
import { OfferEvents, UserEvents } from "../../application/events";

export async function initializeEventHandlers() {
  // Consume TenderCreated events
  await consumeEvents(rabbitmqChannel, "user_created", UserEvents.processUserCreated, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "user_created_dlq",
  });

  await consumeEvents(rabbitmqChannel, "user_tenders_updated", UserEvents.processUserUpdated, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "user_tenders_updated_dlq",
  });

  await consumeEvents(rabbitmqChannel, "user_deleted", UserEvents.processUserDeleted, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "user_deleted_dlq",
  });

  await consumeEvents(rabbitmqChannel, "ent_offer_created", OfferEvents.processOfferCreated, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "offer_created_dlq",
  });

  await consumeEvents(rabbitmqChannel, "ent_offer_deleted", OfferEvents.processOfferDeleted, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "offer_deleted_dlq",
  });

  console.log("Event handlers initialized");
}
