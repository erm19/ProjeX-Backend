import { consumeEvents } from "@urbanix/rabbitmq";
import { rabbitmqChannel } from "../providers";
import { OfferEvents, UserEvents } from "../../application/events";

export async function initializeEventHandlers() {
  const channel = await rabbitmqChannel();
  // Consume TenderCreated events
  await consumeEvents(channel, "user_created", UserEvents.processUserCreated, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "user_created_dlq",
    exchange: "user_exchange",
    routingKey: "user_created",
  });

  await consumeEvents(channel, "user_tenders_updated", UserEvents.processUserUpdated, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "user_tenders_updated_dlq",
    exchange: "user_exchange",
    routingKey: "user_tenders_updated",
  });

  await consumeEvents(channel, "user_deleted", UserEvents.processUserDeleted, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "user_deleted_dlq",
    exchange: "user_exchange",
    routingKey: "user_deleted",
  });

  await consumeEvents(channel, "ent_offer_created", OfferEvents.processOfferCreated, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "offer_created_dlq",
    exchange: "offer_exchange",
    routingKey: "ent_offer_created",
  });

  await consumeEvents(channel, "ent_offer_deleted", OfferEvents.processOfferDeleted, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "offer_deleted_dlq",
    exchange: "offer_exchange",
    routingKey: "ent_offer_deleted",
  });

  console.log("Event handlers initialized");
}
