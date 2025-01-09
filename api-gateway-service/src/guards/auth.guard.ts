import { createHttpClient } from "../core/utils";
import { NextFunction, Request, Response } from "express";
import { HttpMethod } from "../types";

const authHttpClient = createHttpClient(`http://${process.env.AUTH_ADDRESS}`);

export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: "Missing authorization toke" });
    return;
  }

  try {
    const data = await authHttpClient("verify", HttpMethod.POST, { data: req.body, headers: { Authorization: token } });
    req.headers["x-username"] = data.username;
    next();
  } catch (error: any) {
    const status = error.status || 503;
    res.status(status).json({ error: error.message || "Service unavailable" });
  }
};
