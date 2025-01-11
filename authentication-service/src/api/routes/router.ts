import { Router } from "express";
import { AuthController } from "../controllers";
import { validateTokenGuard } from "../middlewares";

export const authRouter = Router();

authRouter.get("/", (req, res, next) => {
  res.json("┻━┻︵ヽ(`Д´)ﾉ︵ ┻━┻");
});

authRouter.post("/signup", AuthController.signup);

authRouter.post("/login", AuthController.login);

authRouter.get("/logout", validateTokenGuard, AuthController.logout);

authRouter.post("/refresh", validateTokenGuard, AuthController.refresh);

authRouter.post("/verify", AuthController.verify);
