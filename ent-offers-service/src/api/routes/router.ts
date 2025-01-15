import { Router } from "express";
import { OffersController } from "../controllers";
import { validate } from "../middleware";
import { createOfferSchema, listByTenderSchema, myOffersSchema } from "../../core/validation";

export const entOffersRouter = Router();

entOffersRouter.get("/my-offers", validate(myOffersSchema), OffersController.myOffers);

entOffersRouter.get("/:tenderId/offers", validate(listByTenderSchema), OffersController.listByTender);

entOffersRouter.post("/:tenderId/offer", validate(createOfferSchema), OffersController.create);
