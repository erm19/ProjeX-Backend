import { convertUnknownToError, ValidationError } from "@urbanix/error-handling";
import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { TenderService } from "../../application/services";
import {
  CreateTenderUseCase,
  GetTenderUseCase,
  ListTendersUseCase,
  MyTendersUseCase,
} from "../../application/use-cases";
import { MongoTenderRepository, MongoUserRepository } from "../../infrastructure/database";

const userRepo = new MongoUserRepository();
const tenderRepo = new MongoTenderRepository();

const tenderService = new TenderService(userRepo, tenderRepo);

const createTenderUseCase = new CreateTenderUseCase(tenderService);
const getTenderUseCase = new GetTenderUseCase(tenderRepo);
const listTendersUseCase = new ListTendersUseCase(tenderService);
const myTendersUseCase = new MyTendersUseCase(tenderService);

export class TendersController {
  static async list(req: Request, res: Response, next: NextFunction) {
    const citiesFilter = (
      Array.isArray(req.query.cities) ? req.query.cities : req.query.cities ? [req.query.cities] : []
    ) as string[];
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const lastId = req.query.lastId as string;

    try {
      const tenders = await listTendersUseCase.execute(citiesFilter, limit, lastId);
      res.json({ ...tenders });
    } catch (error) {
      next(convertUnknownToError(error));
    }
  }

  static async details(req: Request, res: Response, next: NextFunction) {
    const tenderId = req.params.tenderId || "";
    if (!isValidObjectId(tenderId)) {
      throw new ValidationError("Invalid ObjectId");
    }

    try {
      const tender = await getTenderUseCase.execute(tenderId);
      res.json({ tender: tender });
    } catch (error) {
      next(convertUnknownToError(error));
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newTender = await createTenderUseCase.execute({
        title: req.body.title || "",
        username: (req.headers["x-username"] as string) || "",
        tenderType: req.body.type || "",
        endDate: new Date(req.body.endDate),
        hasInspector: !!req.body.hasInspector,
        isPrivate: !!req.body.private,
        parcels: req.body.parcels || [],
        questionnaire: req.body.questionnaire || [],
        city: req.body.city || "",
      });
      res.status(201).json({ message: "Tender created successfully", tender: newTender });
    } catch (error) {
      console.log(error);
      next(convertUnknownToError(error));
    }
  }

  static async myTenders(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await myTendersUseCase.execute(
        (req.headers["x-username"] as string) || "",
        parseInt((req.query.limit as string) || "") || 20,
        req.query.lastId as string
      );

      res.json({ ...result });
    } catch (error) {
      next(convertUnknownToError(error));
    }
  }
}
