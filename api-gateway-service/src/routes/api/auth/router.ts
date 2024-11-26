import { Router } from "express";
import { loginHandler, logoutHandler, refreshHandler, signupHandler, verifyHandler } from "./handlers";

export const authRouter = Router();

authRouter.post("/signup", signupHandler);

authRouter.post("/login", loginHandler);

authRouter.get("/logout", logoutHandler);

authRouter.post("/refresh", refreshHandler);

authRouter.post("/verify", verifyHandler);
