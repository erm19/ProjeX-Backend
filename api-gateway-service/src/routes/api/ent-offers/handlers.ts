import axios, { HttpStatusCode } from "axios";
import expressAsyncHandler from "express-async-handler";

export const myOffersHandler = expressAsyncHandler(async (req, res) => {
  const { status, data } = await axios.get(`http://${process.env.ENT_OFFERS_ADDRESS}/my-offers`, {
    headers: { "Content-Type": req.headers["content-type"], "x-username": req.headers["x-username"] },
  });

  if (status !== HttpStatusCode.Ok) {
    res.sendStatus(status);
    return;
  }

  res.send(data);
});

export const tenderOffersHandler = expressAsyncHandler(async (req, res) => {
  const tenderId = req.params.tenderId;
  const { status, data } = await axios.get(`http://${process.env.ENT_OFFERS_ADDRESS}/${tenderId}/offers`, {
    headers: { "Content-Type": req.headers["content-type"], "x-username": req.headers["x-username"] },
  });

  if (status !== HttpStatusCode.Ok) {
    res.sendStatus(status);
    return;
  }

  res.send(data);
});

export const createOfferHandler = expressAsyncHandler(async (req, res) => {
  const tenderId = req.params.tenderId;
  const { status } = await axios.post(`http://${process.env.ENT_OFFERS_ADDRESS}/${tenderId}/create-offer`, req.body, {
    headers: { "Content-Type": req.headers["content-type"], "x-username": req.headers["x-username"] },
  });

  res.sendStatus(status);
});
