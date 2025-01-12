import express from "express";
import cors from "cors";
import { connectDB } from "./infrastructure/database";
import { entOffersRouter } from "./api/routes";

async function startService() {
  await connectDB();

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/", entOffersRouter);

  app.listen(3003, () => {
    console.log("Server running on port 3003");
  });
}

startService();
