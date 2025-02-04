import { NextFunction, Request, Response } from "express";
import { MongoOfferRepository, MongoUserRepository } from "../../infrastructure/database";
import { CreateOfferService, ListByRefService } from "../../domain/services";
import { CreateOfferUseCase, OffersByCreatorUseCase, OffersByTenderUseCase } from "../../application/use-cases";
import { IQuestionnaire } from "../../domain/entities";
import { convertUnknownToError } from "@urbanix/error-handling";
import { OfferService } from "../../application/services";

const offerRepository = new MongoOfferRepository();
const userRepository = new MongoUserRepository();

const listByRefService = new ListByRefService(offerRepository);
const createOfferServcie = new CreateOfferService(userRepository, offerRepository);
const offerService = new OfferService(offerRepository, createOfferServcie);

const offersByTenderUseCase = new OffersByTenderUseCase(listByRefService);
const offersByCreatorUseCase = new OffersByCreatorUseCase(listByRefService);
const createOfferUseCase = new CreateOfferUseCase(offerService);

export class OffersController {
  static async listByTender(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await offersByTenderUseCase.execute(
        req.params.tenderId || "",
        parseInt(req.query.limit as string),
        req.query.lastId as string
      );

      res.json(result);
    } catch (error) {
      next(convertUnknownToError(error));
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const offer = await createOfferUseCase.execute(
        req.body.tenderId as string,
        req.headers["x-username"] as string,
        req.body.questionnare as IQuestionnaire[]
      );

      res.status(201).json({ message: "Offer created successfully", offer });
    } catch (error) {
      next(convertUnknownToError(error));
    }
  }

  static async myOffers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await offersByCreatorUseCase.execute(
        (req.headers["x-username"] || "") as string,
        parseInt(req.query.limit as string),
        req.query.lastId as string
      );

      res.json(result);
    } catch (error) {
      next(convertUnknownToError(error));
    }
  }
}
