import { createHttpClient } from "../../core/utils";
import { HttpMethod } from "../../core/types";
import { NextFunction, Request, Response } from "express";
import { convertUnknownToError } from "@urbanix/error-handling";

const authHttpClient = createHttpClient(`${process.env.AUTH_ADDRESS}`);

const baseController =
  (endpoint: string, method: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await authHttpClient(endpoint, method, {
        data: req.body,
        headers: { Authorization: req.headers.authorization },
      });
      res.json(data);
    } catch (error) {
      next(convertUnknownToError(error));
    }
  };

export const signupController = baseController("signup", HttpMethod.POST);

export const loginController = baseController("login", HttpMethod.POST);

export const logoutController = baseController("logout", HttpMethod.GET);

export const refreshController = baseController("refresh", HttpMethod.POST);

export const verifyController = baseController("verify", HttpMethod.GET);
