import axios from "axios";
import expressAsyncHandler from "express-async-handler";

export const signupHandler = expressAsyncHandler(async (req, res) => {
  const { data } = await axios.post(`http://${process.env.AUTH_ADDRESS}/signup`, req.body);
  res.send(data);
});

export const loginHandler = expressAsyncHandler(async (req, res) => {
  const { data } = await axios.get(`http://${process.env.AUTH_ADDRESS}/login`);
  res.send(data);
});

export const logoutHandler = expressAsyncHandler(async (req, res) => {
  const { data } = await axios.get(`http://${process.env.AUTH_ADDRESS}/logout`);
  res.send(data);
});
