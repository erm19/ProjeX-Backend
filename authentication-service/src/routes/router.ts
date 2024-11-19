import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { loginHandler, signupHandler } from "./handlers";

export const authRouter = Router();

authRouter.get("/", (req, res, next) => {
  res.json("┻━┻︵ヽ(`Д´)ﾉ︵ ┻━┻");
});

authRouter.post("/signup", signupHandler);

authRouter.get("/login", loginHandler);
