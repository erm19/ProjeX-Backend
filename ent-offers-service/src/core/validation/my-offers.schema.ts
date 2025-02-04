import Joi from "joi";
import { isValidObjectId } from "mongoose";
import { baseListSchema } from "./base-list.schema";

export const myOffersSchema = baseListSchema
  .keys({
    "x-username": Joi.string().trim().email().required().messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),
  })
  .unknown();
