import { Router } from "express";
import { createTenderHandler, getTenderHandler, myTendersHandler, tenderListHandler } from "./handlers";
import { authGuard } from "../../../guards";

export const entTendersRouter = Router();

entTendersRouter.get("/list", tenderListHandler);

entTendersRouter.post("/tender", authGuard, createTenderHandler);

entTendersRouter.get("/tender/:tenderId", authGuard, getTenderHandler);

entTendersRouter.get("/my-tenders", authGuard, myTendersHandler);
