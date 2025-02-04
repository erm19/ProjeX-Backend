import Joi from "joi";
import { baseListSchema } from "./base-list.schema";
import { isValidObjectId } from "mongoose";

export const myTendersSchema = baseListSchema
  .keys({
    "x-username": Joi.string()
      .trim()
      .custom((value, helpers) => {
        if (value && !isValidObjectId(value)) return helpers.message({ custom: "Invalid user Id" });
        return value;
      })
      .messages({
        custom: "Invalid user Id",
      }),
  })
  .unknown();
