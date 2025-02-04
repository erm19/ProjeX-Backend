import Joi from "joi";
import { isValidObjectId } from "mongoose";

export const baseListSchema = Joi.object({
  limit: Joi.string()
    .trim()
    .custom((value, helpers) => {
      if (value && !Number.isFinite(value)) return helpers.message({ custom: "Limit must be a number" });
      return value;
    })
    .messages({
      custom: "Limit must be a number",
    }),
  lastId: Joi.string()
    .trim()
    .custom((value, helpers) => {
      if (value && !isValidObjectId(value)) return helpers.message({ custom: "LastId must be a valid Id" });
    })
    .messages({
      custom: "LastId must be a valid Id",
    }),
}).unknown();
