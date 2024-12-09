import express from "express";
import cors from "cors";
import { entTendersRouter } from "./routes";
import { connectDB } from "./providers";

async function startService() {
  await connectDB();

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/", entTendersRouter);

  app.listen(3002, () => {
    console.log("Server running on port 3002");
  });
}

startService();
