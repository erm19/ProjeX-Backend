import { NextFunction, Request, Response } from "express";
import { BaseError } from "../errors/base.error";
import { InternalServerError } from "../errors/internal-server.error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Handled errors
  if (err instanceof BaseError) {
    const { statusCode, message } = err;

    res.status(statusCode).json({ data: message });
    return;
  }

  // Unhandled errors
  res.status(500).json({ data: "Something went wrong" });
  return;
};

export const convertUnknownToError = (err: unknown) => {
  if (err instanceof BaseError) return err;
  return new InternalServerError();
};
