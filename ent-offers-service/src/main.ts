import express from "express";
import cors from "cors";

async function startService() {
  const app = express();
  app.use(express.json());
  app.use(cors());
}

startService();
