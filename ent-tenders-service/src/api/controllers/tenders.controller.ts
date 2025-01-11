import { Request, Response } from "express";
import { MongoUserRepository } from "../../infrastructure/database";
import { SignupUserUseCase } from "../../application/use-cases";

const userRepository = new MongoUserRepository();
const signupUser = new SignupUserUseCase(userRepository);

export class TendersController {
  static async list(req: Request, res: Response) {}

  static async tender(req: Request, res: Response) {}

  static async create(req: Request, res: Response) {}

  static async myTenders(req: Request, res: Response) {}
}
