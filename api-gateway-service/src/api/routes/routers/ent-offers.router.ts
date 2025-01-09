import { Router } from "express";
import { authGuard } from "../../../guards";
import { myOffersController, tenderOffersController, createOfferController } from "../../controllers";

export const entOffersRouter = Router();

entOffersRouter.get("/my-offers", authGuard, myOffersController);

entOffersRouter.get("/:tenderId", authGuard, tenderOffersController);

entOffersRouter.post("/:tenderId/offer", authGuard, createOfferController);
