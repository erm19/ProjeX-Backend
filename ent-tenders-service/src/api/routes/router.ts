import { Router } from "express";
import { TendersController } from "../controllers";

export const entTendersRouter = Router();

entTendersRouter.get("/", (req, res, next) => {
  res.json("┻━┻︵ヽ(`Д´)ﾉ︵ ┻━┻");
});

entTendersRouter.get("/list", TendersController.list);

entTendersRouter.get("/tender/:tenderId", TendersController.tender);

entTendersRouter.post("/tender", TendersController.create);

entTendersRouter.get("/my-tenders", TendersController.myTenders);
