import { Router } from "express";
import { loginHandler, logoutHandler, refreshHandler, signupHandler, verifyHandler } from "./handlers";
import { validateTokenGuard } from "./token.guard";

export const authRouter = Router();

authRouter.get("/", (req, res, next) => {
  res.json("┻━┻︵ヽ(`Д´)ﾉ︵ ┻━┻");
});

authRouter.post("/signup", signupHandler);

authRouter.post("/login", loginHandler);

authRouter.get("/logout", validateTokenGuard, logoutHandler);

authRouter.post("/refresh", validateTokenGuard, refreshHandler);

authRouter.post("/verify", verifyHandler);
