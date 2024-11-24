import { Router } from "express";
import { loginHandler, logoutHandler, signupHandler } from "./handlers";

export const authRouter = Router();

authRouter.get("/", (req, res, next) => {
  res.json("┻━┻︵ヽ(`Д´)ﾉ︵ ┻━┻");
});

authRouter.post("/signup", signupHandler);

authRouter.post("/login", loginHandler);

authRouter.post("/logout", logoutHandler);
