import axios from "axios";
import { asyncHandler } from "../../../utils";
import { NextFunction, Request, Response } from "express";

export const signupHandler =
  // asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await axios.post("http://localhost:3001/signup", req.body);
  };
// );

export const loginHandler =
  //  asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await axios.get("http://localhost:3001/login");
  };
// );

export const logoutHandler =
  //  asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await axios.get("http://localhost:3001/logout");
  };
// );
