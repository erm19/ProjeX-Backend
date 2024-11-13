import { Router } from "express";
import { authRouter } from "./auth";
import { entrTendersRouter } from "./entrepreneurs-tenders";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);

apiRouter.use("/entre-tenders", entrTendersRouter);
