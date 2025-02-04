import Joi from "joi";
import { baseListSchema } from "./base-list.schema";
import { isValidObjectId } from "mongoose";

export const myTendersSchema = baseListSchema
  .keys({
    "x-username": Joi.string().trim().email().required().messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),
  })
  .unknown();
