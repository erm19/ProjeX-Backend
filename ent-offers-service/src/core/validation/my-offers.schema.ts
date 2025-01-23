import Joi from "joi";
import { isValidObjectId } from "mongoose";
import { baseListSchema } from "./base-list.schema";

export const myOffersSchema = baseListSchema
  .keys({
    "x-username": Joi.string()
      .trim()
      .required()
      .custom((value, helpers) => {
        if (!isValidObjectId(value)) return helpers.message({ message: "Invalid user ID" });
        return value;
      }),
  })
  .unknown();
