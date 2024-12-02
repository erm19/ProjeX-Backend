import { Router } from "express";
import { authRouter } from "./auth";
import { entTendersRouter } from "./ent-tenders";
import { entOffersRouter } from "./ent-offers";
import { paymentRouter } from "./payment/router";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);

apiRouter.use("/payment", paymentRouter);

apiRouter.use("/ent-tenders", entTendersRouter);

apiRouter.use("/ent-offers", entOffersRouter);
