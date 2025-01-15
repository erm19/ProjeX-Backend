import express from "express";
import cors from "cors";
import { connectDB, MongoTenderRepository, MongoUserRepository } from "./infrastructure/database";
import { entTendersRouter } from "./api/routes";
import { errorHandler } from "@urbanix/error-handling";

export const userRepo = new MongoUserRepository();
export const tenderRepo = new MongoTenderRepository();

async function startService() {
  await connectDB();

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/", entTendersRouter);

  app.use(errorHandler);

  app.listen(3002, () => {
    console.log("Server running on port 3002");
  });
}

startService();
