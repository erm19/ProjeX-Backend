import express from "express";
import cors from "cors";
import { authRouter } from "./api/routes";
import { connectDB } from "./infrastructure/database";
import { errorHandler } from "@urbanix/error-handling";
import { initializeEventHandlers } from "./infrastructure/messages/event-handlers";

async function startService() {
  await connectDB();

  const app = express();
  const PORT = process.env.PORT || 3001;

  try {
    await initializeEventHandlers();
  } catch (error) {
    console.error("Error initializing event handlers", error);
  }

  app.use(express.json());
  app.use(cors());

  app.use(authRouter);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startService();
