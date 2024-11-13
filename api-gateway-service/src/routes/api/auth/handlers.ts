import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const signupHandler = async (req: Request, res: Response, next: NextFunction) => {
  await axios.post("http://localhost:3001/signup", req.body, {});
};

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  await axios.get("http://localhost:3001/login");
};

export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  await axios.get("http://localhost:3001/logout");
};
