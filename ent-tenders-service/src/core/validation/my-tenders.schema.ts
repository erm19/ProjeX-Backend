import Joi from "joi";
import { baseListSchema } from "./base-list.schema";
import { isValidObjectId } from "mongoose";

export const myTendersSchema = baseListSchema
  .keys({
    "x-username": Joi.string()
      .trim()
      .custom((value, helpers) => {
        if (value && !isValidObjectId(value)) return helpers.message({ message: "Invalid user Id" });
        return value;
      }),
  })
  .unknown();
