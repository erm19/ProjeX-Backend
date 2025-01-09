import { Router } from "express";
import { authRouter, entOffersRouter, entTendersRouter } from "./routers";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);

apiRouter.use("/ent-tenders", entTendersRouter);

apiRouter.use("/ent-offers", entOffersRouter);
