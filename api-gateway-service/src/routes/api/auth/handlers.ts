import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../../utils";

export const signupHandler = asyncHandler(async (req, res, next) => {
  const response = await axios.post("http://localhost:3001/signup", req.body);
});

export const loginHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await axios.get("http://localhost:3001/login");
});

export const logoutHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await axios.get("http://localhost:3001/logout");
});
