import express from "express";
import cors from "cors";

async function startService() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // app.use("/", appRouter);

  app.listen(3001, () => {
    console.log("Server running on port 3000");
  });
}

startService();
