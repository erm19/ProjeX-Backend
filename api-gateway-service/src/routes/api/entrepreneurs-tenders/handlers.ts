import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const tendersListHandler = async (req: Request, res: Response, next: NextFunction) => {
  const result = await axios.get("http://localhost:3002/list");
  res.send(result);
};

export const createTenderHandler = async (req: Request, res: Response, next: NextFunction) => {
  await axios.post("http://localhost:3002/create-tender", req.body);
  res.sendStatus(201);
};

export const createOfferHandler = async (req: Request, res: Response, next: NextFunction) => {
  await axios.post("http://localhost:3002/create-offer", req.body);
  res.sendStatus(201);
};

export const tenderOffersHandler = async (req: Request, res: Response, next: NextFunction) => {
  const tenderId = req.params.tenderId;
  const result = await axios.get(`http://localhost:3002/${tenderId}/offers`);
  res.send(result);
};
