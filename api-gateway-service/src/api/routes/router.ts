import { Router } from "express";
import { authRouter, entOffersRouter } from "./routers";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);

// apiRouter.use("/payment", paymentRouter);

// apiRouter.use("/ent-tenders", entTendersRouter);

apiRouter.use("/ent-offers", entOffersRouter);
