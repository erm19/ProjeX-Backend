import { Router } from "express";
import {
  createTenderController,
  myTendersController,
  tenderDetailsController,
  tenderListController,
} from "../../controllers";
import { authGuard } from "../../middlewares";

export const entTendersRouter = Router();

entTendersRouter.get("/list", tenderListController);

entTendersRouter.post("/tender", authGuard("lawyer"), createTenderController);

entTendersRouter.get("/tender/:tenderId", authGuard(["lawyer", "entrepreneur"]), tenderDetailsController);

entTendersRouter.get("/my-tenders", authGuard("lawyer"), myTendersController);
