import express from "express";
import cors from "cors";
import { authRouter } from "./routes";

async function startService() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/", authRouter);

  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
}

startService();
