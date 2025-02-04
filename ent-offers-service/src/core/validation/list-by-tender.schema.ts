import Joi from "joi";
import { isValidObjectId } from "mongoose";
import { baseListSchema } from "./base-list.schema";

export const listByTenderSchema = baseListSchema
  .keys({
    tenderId: Joi.string()
      .trim()
      .required()
      .custom((value, helpers) => {
        if (!isValidObjectId(value)) return helpers.message({ custom: "Invalid tender ID" });
        return value;
      })
      .messages({
        custom: "Invalid tender ID",
      }),
  })
  .unknown();
