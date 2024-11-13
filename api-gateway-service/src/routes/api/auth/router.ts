import { Router } from "express";
import { loginHandler, logoutHandler, signupHandler } from "./handlers";

export const authRouter = Router();

authRouter.post("/signup", signupHandler);

authRouter.get("/login", loginHandler);

authRouter.get("/logout", logoutHandler);
