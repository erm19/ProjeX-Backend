import { Request, Response } from "express";
import { CreateTenderUseCase, GetTenderUseCase } from "../../application/use-cases";
import { CreateTenderService } from "../../domain/services";
import { tenderRepo, userRepo } from "../../main";
import { isValidObjectId } from "mongoose";

const createTenderService = new CreateTenderService(userRepo, tenderRepo);
const createTenderUseCase = new CreateTenderUseCase(createTenderService);
const getTenderUseCase = new GetTenderUseCase(tenderRepo);

export class TendersController {
  static async list(req: Request, res: Response) {}

  static async tender(req: Request, res: Response) {
    const tenderId = req.params.tenderId || "";
    if (isValidObjectId(tenderId)) {
      res.status(400).json({ message: "Invalid ObjectId format" });
      return;
    }

    try {
      const tender = getTenderUseCase.execute(tenderId);
      res.json({ tender: tender });
    } catch (error: any) {}
  }

  static async create(req: Request, res: Response) {
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
    } catch (error: any) {}
  }

  static async myTenders(req: Request, res: Response) {}
}
