import { Router } from "express";
import { TendersController } from "../controllers";
import { validate } from "../middleware";
import { createTenderSchema, detailsSchema, listTendersSchema, myTendersSchema } from "../../core/validation";

export const entTendersRouter = Router();

entTendersRouter.get("/", (req, res, next) => {
  res.json("┻━┻︵ヽ(`Д´)ﾉ︵ ┻━┻");
});

entTendersRouter.get("/list", validate(listTendersSchema), TendersController.list);

entTendersRouter.get("/details/:tenderId", validate(detailsSchema), TendersController.details);

entTendersRouter.post("/tender", validate(createTenderSchema), TendersController.create);

entTendersRouter.get("/my-tenders", validate(myTendersSchema), TendersController.myTenders);
