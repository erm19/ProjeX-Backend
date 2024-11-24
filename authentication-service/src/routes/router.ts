import { Router } from "express";
import { loginHandler, logoutHandler, refreshHandler, signupHandler } from "./handlers";
import { validateTokenGuard } from "./token.guard";

export const authRouter = Router();

authRouter.get("/", (req, res, next) => {
  res.json("┻━┻︵ヽ(`Д´)ﾉ︵ ┻━┻");
});

authRouter.post("/signup", signupHandler);

authRouter.post("/login", loginHandler);

authRouter.post("/logout", validateTokenGuard, logoutHandler);

authRouter.post("/refresh", validateTokenGuard, refreshHandler);
