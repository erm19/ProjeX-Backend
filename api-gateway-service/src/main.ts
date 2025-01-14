import express from "express";
import cors from "cors";
import { appRouter } from "./api/routes";
import { errorHandler } from "@urbanix/error-handling";

async function startService() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/", appRouter);

  app.use(errorHandler);

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

startService();
