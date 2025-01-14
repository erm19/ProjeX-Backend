import { createHttpClient, handleUnknownError } from "../../core/utils";
import { HttpMethod } from "../../core/types";
import { Request, Response } from "express";

const authHttpClient = createHttpClient(`http://${process.env.AUTH_ADDRESS}`);

const baseController = (endpoint: string, method: string) => async (req: Request, res: Response) => {
  try {
    const data = await authHttpClient(endpoint, method, {
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (error) {
    handleUnknownError(error);
  }
};

export const signupController = baseController("signup", HttpMethod.POST);

export const loginController = baseController("login", HttpMethod.POST);

export const logoutController = baseController("logout", HttpMethod.GET);

export const refreshController = baseController("refresh", HttpMethod.POST);

export const verifyController = baseController("verify", HttpMethod.POST);
