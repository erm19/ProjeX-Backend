import { Router } from "express";
import { authGuard } from "guards/auth.guard";
import { createOfferHandler, myOffersHandler, tenderOffersHandler } from "./handlers";

export const entOffersRouter = Router();

entOffersRouter.get("/my-offers", authGuard, myOffersHandler);

entOffersRouter.get("/:tenderId", authGuard, tenderOffersHandler);

entOffersRouter.post("/:tenderId/offer", authGuard, createOfferHandler);
