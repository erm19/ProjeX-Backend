import express from "express";
import cors from "cors";
import { connectDB, MongoTenderRepository, MongoUserRepository } from "./infrastructure/database";
import { entTendersRouter } from "./api/routes";
import { errorHandler } from "@urbanix/error-handling";
import { initializeEventHandlers } from "./infrastructure/messages/event-handlers";
import { set } from "mongoose";

export const userRepo = new MongoUserRepository();
export const tenderRepo = new MongoTenderRepository();

async function startService() {
  await connectDB();

  const app = express();
  const PORT = process.env.PORT || 3002;

  try {
    await initializeEventHandlers();
  } catch (error) {
    console.log(error);
    setTimeout(async () => {
      await initializeEventHandlers();
    }, 5000);
  }

  app.use(express.json());
  app.use(cors());

  app.use("/", entTendersRouter);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startService();
