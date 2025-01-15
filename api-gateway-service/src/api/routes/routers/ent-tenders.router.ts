import { Router } from "express";
import {
  tenderListController,
  createTenderController,
  tenderDetailsController,
  myTendersController,
} from "../../controllers";
import { authGuard } from "../../middlewares";

export const entTendersRouter = Router();

entTendersRouter.get("/list", tenderListController);

entTendersRouter.post("/tender", authGuard, createTenderController);

entTendersRouter.get("/tender/:tenderId", authGuard, tenderDetailsController);

entTendersRouter.get("/my-tenders", authGuard, myTendersController);
