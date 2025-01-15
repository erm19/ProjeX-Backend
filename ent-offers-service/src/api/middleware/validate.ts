import { ValidationError } from "@urbanix/error-handling";
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  // Combine req.body, req.headers, req.query, and req.params
  const dataToValidate = {
    ...req.body,
    ...req.headers,
    ...req.query,
    ...req.params,
  };

  // Validate the combined data
  const { error } = schema.validate(dataToValidate);

  if (error) {
    throw new ValidationError(error.details[0].message);
  }

  next();
};
