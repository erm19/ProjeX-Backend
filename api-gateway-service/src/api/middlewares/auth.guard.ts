import { NextFunction, Request, Response } from "express";
import { HttpMethod } from "../../core/types";
import { createHttpClient } from "../../core/utils";

const authHttpClient = createHttpClient(`${process.env.AUTH_ADDRESS}`);

export const authGuard =
  (requiredAuth: string | string[]) => async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ error: "Missing authorization token" });
      return;
    }

    try {
      const { username, isAuthorized } = await authHttpClient("authorization", HttpMethod.POST, {
        data: { roles: requiredAuth },
        headers: { authorization: token },
      });

      if (!isAuthorized) {
        res.status(403).json({ error: "Forbidden: insufficiant permissions" });
        return;
      }

      req.headers["x-username"] = username;
      next();
    } catch (error: any) {
      const status = error.status || 503;
      res.status(status).json({ error: error.message || "Service unavailable" });
    }
  };
