import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { authRouter, signupHandler } from "./routes";

async function startService() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  app.post("/signup", signupHandler);

  // app.use(authRouter);

  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
}

startService();
