import { Router } from "express";
import { OffersController } from "../controllers";

export const entOffersRouter = Router();

entOffersRouter.get("/my-offers", OffersController.myOffers);

entOffersRouter.get("/:tenderId/offers", OffersController.listByTender);

entOffersRouter.post("/:tenderId/offer", OffersController.create);
