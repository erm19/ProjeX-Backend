import axios from "axios";
import expressAsyncHandler from "express-async-handler";
import { createHttpClient } from "../../core/utils";
import { HttpMethod } from "../../types";

const authHttpClient = createHttpClient(`http://${process.env.AUTH_ADDRESS}`);

export const signupController = expressAsyncHandler(async (req, res) => {
  try {
    const data = await authHttpClient("signup", HttpMethod.POST, { data: req.body });
    res.send(data);
  } catch (error: any) {
    // TODO: Deal with it later
  }
});

export const loginController = expressAsyncHandler(async (req, res) => {
  try {
    const data = await authHttpClient("login", HttpMethod.POST, { data: req.body });
    res.send(data);
  } catch (error: any) {
    // TODO:
  }
});

export const logoutController = expressAsyncHandler(async (req, res) => {
  try {
    const data = await authHttpClient("logout", HttpMethod.GET, {
      headers: { Authorization: req.headers.authorization },
    });
    res.send(data);
  } catch (error: any) {}
});

export const refreshController = expressAsyncHandler(async (req, res) => {
  try {
    const data = await authHttpClient("refresh", HttpMethod.POST, {
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.send(data);
  } catch (error: any) {}
});

export const verifyController = expressAsyncHandler(async (req, res) => {
  try {
    const data = await authHttpClient("verify", HttpMethod.POST, {
      data: req.body,
      headers: { Authorization: req.headers.authorization },
    });
    res.send(data);
  } catch (error: any) {}
});
