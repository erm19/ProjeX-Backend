import expressAsyncHandler from "express-async-handler";
import { EntOffer, User } from "../models";

export const myOffersHandler = expressAsyncHandler(async (req, res) => {});

export const getOffersHandler = expressAsyncHandler(async (req, res) => {
  const tenderId = req.params.tenderId || "";
  const offers = await EntOffer.find({ tenderId: tenderId });
  res.send(offers);
});

export const createOfferHandler = expressAsyncHandler(async (req, res) => {
  const tenderId = req.params.tenderId || "";
  const user = await User.findOne({ email: req.headers["x-username"] });
  const questionnaire = req.body.questionnaire || [];

  if (!user) {
    res.status(404).json({ message: "User Not Found" });
    return;
  }

  const offer = new EntOffer({ tenderId: tenderId, creator: user._id, questionnaire: questionnaire });
  await offer.save();
  res.sendStatus(201);
});
