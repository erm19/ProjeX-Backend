import express from "express";
import cors from "cors";
import { authRouter } from "./api/routes";
import { connectDB } from "./infrastructure/database";

async function startService() {
  await connectDB();

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(authRouter);

  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
}

startService();
