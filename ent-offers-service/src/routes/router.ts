import { Router } from "express";
import { createOfferHandler, getOffersHandler, myOffersHandler } from "./handlers";

export const entOffersRouter = Router();

entOffersRouter.get("/my-offers", myOffersHandler);

entOffersRouter.get("/:tenderId", getOffersHandler);

entOffersRouter.post("/:tenderId/offer", createOfferHandler);
