import expressAsyncHandler from "express-async-handler";
import { Tender, User } from "../models";
import { isValidObjectId } from "mongoose";

export const tendersListHandler = expressAsyncHandler(async (req, res) => {
  const citiesFilter: string[] = (req.query["cities"] as string[]) || [];
  const queryFilter = citiesFilter.length > 0 ? { city: { $in: citiesFilter } } : {};
  const tenders = await Tender.find(queryFilter, { title: true, type: true, parcels: true, endDate: true, city: true });
  res.send(tenders);
});

export const getTenderHandler = expressAsyncHandler(async (req, res) => {
  const tenderId = req.params.tenderId || "";
  if (isValidObjectId(tenderId)) {
    res.status(400).json({ message: "Invalid ObjectId format" });
    return;
  }
  const tender = await Tender.findById(tenderId);
  res.send(tender);
});

export const createTenderHandler = expressAsyncHandler(async (req, res) => {
  const title = req.body.title || "";
  const username = req.headers["x-username"] || "";
  const tenderType = req.body.type || "";
  const endDate = new Date(req.body.endDate);
  const hasInspector = !!req.body.hasInspector;
  const isPrivate = !!req.body.private;
  const parcels = req.body.parcels || [];
  const questionnaire = req.body.questionnaire || [];
  const city = req.body.city || "";

  const user = await User.findOne({ email: username });

  if (!user) {
    res.status(404).json({ message: "User Not Found" });
    return;
  }

  const newTender = new Tender({
    title,
    creator: user._id,
    type: tenderType,
    endDate,
    hasInspector,
    private: isPrivate,
    parcels,
    questionnaire,
    city,
  });

  await newTender.save();

  res.sendStatus(201);
});

export const getMyTendersHandler = expressAsyncHandler(async (req, res) => {});
