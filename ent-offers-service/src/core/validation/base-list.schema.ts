import Joi from "joi";
import { isValidObjectId } from "mongoose";

export const baseListSchema = Joi.object({
  limit: Joi.string()
    .trim()
    .custom((value, helpers) => {
      if (value && !Number.isFinite(value)) return helpers.message({ message: "Limit must be a number" });
      return value;
    }),
  lastId: Joi.string()
    .trim()
    .custom((value, helpers) => {
      if (value && !isValidObjectId(value)) return helpers.message({ message: "LastId must be a valid Id" });
    }),
});
