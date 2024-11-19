import axios from "axios";
import expressAsyncHandler from "express-async-handler";

export const tendersListHandler = expressAsyncHandler(async (req, res) => {
  const { data } = await axios.get(`http://${process.env.TENDER_ADDRESS}/list`);
  res.send(data);
});

export const createTenderHandler = expressAsyncHandler(async (req, res) => {
  const { status } = await axios.post(`http://${process.env.TENDER_ADDRESS}/create-tender`, req.body);
  res.sendStatus(status);
});

export const createOfferHandler = expressAsyncHandler(async (req, res) => {
  const tenderId = req.params.tenderId;
  const { status } = await axios.post(`http://${process.env.TENDER_ADDRESS}/${tenderId}/create-offer`, req.body);
  res.sendStatus(status);
});

export const tenderOffersHandler = expressAsyncHandler(async (req, res) => {
  const tenderId = req.params.tenderId;
  const { data } = await axios.get(`http://${process.env.TENDER_ADDRESS}/${tenderId}/offers`);
  res.send(data);
});
