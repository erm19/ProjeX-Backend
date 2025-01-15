import { Router } from "express";
import { myOffersController, tenderOffersController, createOfferController } from "../../controllers";
import { authGuard } from "../../middlewares";

export const entOffersRouter = Router();

entOffersRouter.get("/my-offers", authGuard, myOffersController);

entOffersRouter.get("/:tenderId", authGuard, tenderOffersController);

entOffersRouter.post("/:tenderId/offer", authGuard, createOfferController);
