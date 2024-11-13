import express from "express";
import cors from "cors";
import { appRouter } from "./routes";

async function startService() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/", appRouter);

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

startService();
