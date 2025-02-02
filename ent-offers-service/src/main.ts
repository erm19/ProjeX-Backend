import express from "express";
import cors from "cors";
import { connectDB } from "./infrastructure/database";
import { entOffersRouter } from "./api/routes";
import { errorHandler } from "@urbanix/error-handling";
import { initializeEventHandlers } from "./infrastructure/messages/event-handlers";

async function startService() {
  await connectDB();

  const app = express();
  const PORT = process.env.PORT || 3003;

  try {
    await initializeEventHandlers();
  } catch (error) {
    console.log(error);
  }
  app.use(express.json());
  app.use(cors());

  app.use("/", entOffersRouter);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startService();
