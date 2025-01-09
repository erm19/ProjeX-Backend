import { Router } from "express";
import { apiRouter } from "./api.router";

export const appRouter = Router();

appRouter.get("/", (req, res, next) => {
  res.json("┻━┻︵ヽ(`Д´)ﾉ︵ ┻━┻");
});

appRouter.use("/api", apiRouter);
