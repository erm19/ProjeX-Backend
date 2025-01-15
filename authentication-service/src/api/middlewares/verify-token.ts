import { NextFunction, Request, Response } from "express";
import { VerifyTokenUseCase } from "../../application/use-cases";

export const validateTokenGuard = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    req.body.username = await VerifyTokenUseCase.execute(token);
    next(); // Token is valid, proceed to the next middleware
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};
