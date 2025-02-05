import { Router } from "express";
import { createOfferController, myOffersController, tenderOffersController } from "../../controllers";
import { authGuard } from "../../middlewares";

export const entOffersRouter = Router();

entOffersRouter.get("/my-offers", authGuard("entrepreneur"), myOffersController);

entOffersRouter.get("/:tenderId", authGuard("entrepreneur"), tenderOffersController);

entOffersRouter.post("/:tenderId/offer", authGuard("entrepreneur"), createOfferController);
