import { Router } from "express";
import { createOfferHandler, createTenderHandler, tenderOffersHandler } from "./handlers";

export const entrTendersRouter = Router();

entrTendersRouter.get("/");

entrTendersRouter.post("/tender", createTenderHandler);

entrTendersRouter.post("/offer", createOfferHandler);

entrTendersRouter.get("/:tenderId/offers", tenderOffersHandler);
