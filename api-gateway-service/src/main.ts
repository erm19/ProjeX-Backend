import express from "express";
import cors from "cors";
import { appRouter } from "./api/routes";
import { errorHandler } from "@urbanix/error-handling";

async function startService() {
  const app = express();

  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cors());

  app.use("/", appRouter);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startService();
