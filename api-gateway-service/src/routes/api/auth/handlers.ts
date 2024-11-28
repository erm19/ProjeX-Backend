import axios from "axios";
import expressAsyncHandler from "express-async-handler";

export const signupHandler = expressAsyncHandler(async (req, res) => {
  const { data } = await axios.post(`http://${process.env.AUTH_ADDRESS}/signup`, req.body, { headers: req.headers });
  res.send(data);
});

export const loginHandler = expressAsyncHandler(async (req, res) => {
  const { data } = await axios.post(`http://${process.env.AUTH_ADDRESS}/login`, req.body, { headers: req.headers });
  res.send(data);
});

export const logoutHandler = expressAsyncHandler(async (req, res) => {
  const { data } = await axios.get(`http://${process.env.AUTH_ADDRESS}/logout`, { headers: req.headers });
  res.send(data);
});

export const refreshHandler = expressAsyncHandler(async (req, res) => {
  const { data } = await axios.post(`http://${process.env.AUTH_ADDRESS}/refresh`, req.body, { headers: req.headers });
  res.send(data);
});

export const verifyHandler = expressAsyncHandler(async (req, res) => {
  const { data } = await axios.post(`http://${process.env.AUTH_ADDRESS}/verify`, req.body, { headers: req.headers });
});
