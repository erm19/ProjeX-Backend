import { BaseError } from "@urbanix/error-handling";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Handled errors
  if (err instanceof BaseError) {
    const { statusCode, message } = err;

    res.status(statusCode).json({ message });
    return;
  }

  // Unhandled errors
  res.status(500).json({ message: "Something went wrong" });
  return;
};
