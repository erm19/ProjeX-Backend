import { consumeEvents } from "@urbanix/rabbitmq";
import { rabbitmqChannel } from "../providers";

export async function initializeEventHandlers() {
  // Consume TenderCreated events
  await consumeEvents(rabbitmqChannel, "tender_created", async (data: any) => {}, {
    retryDelayMs: 2000,
    maxRetries: 3,
    dlqName: "tender_created_dlq",
  });

  console.log("Event handlers initialized");
}
