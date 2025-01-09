import axios, { AxiosRequestConfig } from "axios";
import expressAsyncHandler from "express-async-handler";
import { createHttpClient } from "../../core/utils";
import { HttpMethod } from "../../types";
import { Request, Response } from "express";

const authHttpClient = createHttpClient(`http://${process.env.AUTH_ADDRESS}`);

const baseAuthController = (endpoint: string, method: string) => async (req: Request, res: Response) => {
  try {
    const data = await authHttpClient(endpoint, method, {
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.json(data);
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const signupController = baseAuthController("signup", HttpMethod.POST);

export const loginController = baseAuthController("login", HttpMethod.POST);

export const logoutController = baseAuthController("logout", HttpMethod.GET);

export const refreshController = baseAuthController("refresh", HttpMethod.POST);

export const verifyController = baseAuthController("verify", HttpMethod.POST);
