import axios, { HttpStatusCode } from "axios";
import expressAsyncHandler from "express-async-handler";

export const authGuard = expressAsyncHandler(async (req, res, next) => {
  const { status, data } = await axios.post(`http://${process.env.AUTH_ADDRESS}/verify`, req.body, {
    headers: { Authorization: req.headers.authorization },
  });
  if (status !== HttpStatusCode.Ok) {
    res.sendStatus(401);
    return;
  }

  req.headers["x-username"] = data.username;

  next();
});
