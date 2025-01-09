import { Router } from "express";
import {
  signupController,
  loginController,
  logoutController,
  refreshController,
  verifyController,
} from "../../controllers";

export const authRouter = Router();

authRouter.post("/signup", signupController);

authRouter.post("/login", loginController);

authRouter.get("/logout", logoutController);

authRouter.post("/refresh", refreshController);

authRouter.post("/verify", verifyController);
