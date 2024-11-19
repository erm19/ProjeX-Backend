import { NextFunction, Request, Response, Router } from "express";
import { apiRouter } from "./api";

export const appRouter = Router();

appRouter.get("/", (req, res, next) => {
  res.json("┻━┻︵ヽ(`Д´)ﾉ︵ ┻━┻");
});

appRouter.use("/api", apiRouter);
