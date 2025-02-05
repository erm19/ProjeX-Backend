import { Router } from "express";
import { authoriztionSchema, loginSchema, refreshTokenSchema, SignupSchema } from "../../core/validation";
import { tokenSchema } from "../../core/validation/token.schema";
import { AuthController } from "../controllers";
import { validate, validateTokenGuard } from "../middlewares";

export const authRouter = Router();

authRouter.get("/", (req, res, next) => {
  res.json("┻━┻︵ヽ(`Д´)ﾉ︵ ┻━┻");
});

authRouter.post("/signup", validate(SignupSchema), AuthController.signup);

authRouter.post("/login", validate(loginSchema), AuthController.login);

authRouter.get("/logout", validate(tokenSchema), validateTokenGuard, AuthController.logout);

authRouter.post("/refresh", validate(refreshTokenSchema), validateTokenGuard, AuthController.refresh);

authRouter.get("/verify", validate(tokenSchema), AuthController.verify);

authRouter.post("/authorization", validate(authoriztionSchema), AuthController.authorization);
