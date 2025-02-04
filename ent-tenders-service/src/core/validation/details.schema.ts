import Joi from "joi";
import { isValidObjectId } from "mongoose";

export const detailsSchema = Joi.object({
  tenderId: Joi.string()
    .trim()
    .custom((value, helpers) => {
      if (value && !isValidObjectId(value)) return helpers.message({ custom: "Invalid tender Id" });
      return value;
    })
    .messages({
      custom: "Invalid tender Id",
    }),
}).unknown();
