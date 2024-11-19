import axios from "axios";
import expressAsyncHandler from "express-async-handler";

export const tendersListHandler = expressAsyncHandler(async (req, res) => {
  const result = await axios.get(`http://${process.env.TENDER_ADDRESS}/list`);
  res.send(result);
});

export const createTenderHandler = expressAsyncHandler(async (req, res) => {
  await axios.post(`http://${process.env.TENDER_ADDRESS}/create-tender`, req.body);
  res.sendStatus(201);
});

export const createOfferHandler = expressAsyncHandler(async (req, res) => {
  const tenderId = req.params.tenderId;
  await axios.post(`http://${process.env.TENDER_ADDRESS}/${tenderId}/create-offer`, req.body);
  res.sendStatus(201);
});

export const tenderOffersHandler = expressAsyncHandler(async (req, res) => {
  const tenderId = req.params.tenderId;
  const result = await axios.get(`http://${process.env.TENDER_ADDRESS}/${tenderId}/offers`);
  res.send(result);
});
