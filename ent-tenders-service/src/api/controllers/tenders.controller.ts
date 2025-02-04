import { NextFunction, Request, Response } from "express";
import { CreateTenderUseCase, GetTenderUseCase, ListTendersUseCase } from "../../application/use-cases";
import { CreateTenderService, ListTendersService } from "../../domain/services";
import { isValidObjectId } from "mongoose";
import { convertUnknownToError, ValidationError } from "@urbanix/error-handling";
import { MongoUserRepository, MongoTenderRepository } from "../../infrastructure/database";
import { TenderService } from "../../application/services";

const userRepo = new MongoUserRepository();
const tenderRepo = new MongoTenderRepository();

const createTenderUseCase = new CreateTenderUseCase(
  new TenderService(new CreateTenderService(userRepo, tenderRepo), tenderRepo)
);
const getTenderUseCase = new GetTenderUseCase(tenderRepo);
const listTendersService = new ListTendersService(tenderRepo);
const listTendersUseCase = new ListTendersUseCase(listTendersService);

export class TendersController {
  static async list(req: Request, res: Response, next: NextFunction) {
    const citiesFilter = (
      Array.isArray(req.query.cities) ? req.query.cities : req.query.cities ? [req.query.cities] : []
    ) as string[];
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const lastId = req.query.lastId as string;

    try {
      const tenders = await listTendersUseCase.execute(citiesFilter, limit, lastId);
      res.json({ tenders });
    } catch (error) {
      next(convertUnknownToError(error));
    }
  }

  static async details(req: Request, res: Response, next: NextFunction) {
    const tenderId = req.params.tenderId || "";
    if (isValidObjectId(tenderId)) {
      throw new ValidationError("Invalid ObjectId");
    }

    try {
      const tender = getTenderUseCase.execute(tenderId);
      res.json({ tender: tender });
    } catch (error) {
      next(convertUnknownToError(error));
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newTender = createTenderUseCase.execute({
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
      next(convertUnknownToError(error));
    }
  }

  static async myTenders(req: Request, res: Response) {
    res.json({ tenders: [] });
  }
}
