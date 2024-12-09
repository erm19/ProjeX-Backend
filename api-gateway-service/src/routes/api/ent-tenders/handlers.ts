import axios, { HttpStatusCode } from "axios";
import expressAsyncHandler from "express-async-handler";

export const tenderListHandler = expressAsyncHandler(async (req, res) => {
  const { status, data } = await axios.get(`http://${process.env.ENT_TENDER_ADDRESS}/list`, { params: req.query });
  if (status !== HttpStatusCode.Ok) {
    res.sendStatus(status);
    return;
  }

  res.send(data);
});

export const getTenderHandler = expressAsyncHandler(async (req, res) => {
  const { status, data } = await axios.get(`http://${process.env.ENT_TENDER_ADDRESS}/tender/${req.params.tenderId}`, {
    headers: { "Content-Type": req.headers["content-type"], "x-username": req.headers["x-username"] },
  });

  if (status !== HttpStatusCode.Ok) {
    res.sendStatus(status);
    return;
  }

  res.send(data);
});

export const createTenderHandler = expressAsyncHandler(async (req, res) => {
  const { status } = await axios.post(`http://${process.env.ENT_TENDER_ADDRESS}/tender`, req.body, {
    headers: { "Content-Type": req.headers["content-type"], "x-username": req.headers["x-username"] },
  });

  res.sendStatus(status);
});

export const myTendersHandler = expressAsyncHandler(async (req, res) => {
  const { status, data } = await axios.get(`http://${process.env.ENT_TENDER_ADDRESS}/my-tenders`, {
    headers: { "Content-Type": req.headers["content-type"], "x-username": req.headers["x-username"] },
  });

  if (status !== HttpStatusCode.Ok) {
    res.sendStatus(status);
    return;
  }

  res.send(data);
});
