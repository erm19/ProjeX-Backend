import express from "express";
import cors from "cors";
import { connectDB } from "./infrastructure/database";
import { entOffersRouter } from "./api/routes";
import { errorHandler } from "@urbanix/error-handling";

async function startService() {
  await connectDB();

  const app = express();
  const PORT = process.env.PORT || 3003;
  app.use(express.json());
  app.use(cors());

  app.use("/", entOffersRouter);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startService();
