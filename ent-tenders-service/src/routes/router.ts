import { Router } from "express";
import { createTenderHandler, getMyTendersHandler, getTenderHandler, tendersListHandler } from "./handlers";

export const entTendersRouter = Router();

entTendersRouter.get("/", (req, res, next) => {
  res.json("┻━┻︵ヽ(`Д´)ﾉ︵ ┻━┻");
});

entTendersRouter.get("/list", tendersListHandler);

entTendersRouter.get("tender/:tenderId", getTenderHandler);

entTendersRouter.post("tender", createTenderHandler);

entTendersRouter.get("/my-tenders", getMyTendersHandler);
