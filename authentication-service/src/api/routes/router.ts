import { Router } from "express";
import { AuthController } from "../controllers";
import { validate, validateTokenGuard } from "../middlewares";
import { loginSchema, refreshTokenSchema, SignupSchema } from "../../core/validation";
import { tokenSchema } from "../../core/validation/token.schema";

export const authRouter = Router();

authRouter.get("/", (req, res, next) => {
  res.json("┻━┻︵ヽ(`Д´)ﾉ︵ ┻━┻");
});

authRouter.post("/signup", validate(SignupSchema), AuthController.signup);

authRouter.post("/login", validate(loginSchema), AuthController.login);

authRouter.get("/logout", validate(tokenSchema), validateTokenGuard, AuthController.logout);

authRouter.post("/refresh", validate(refreshTokenSchema), validateTokenGuard, AuthController.refresh);

authRouter.post("/verify", validate(tokenSchema), AuthController.verify);
