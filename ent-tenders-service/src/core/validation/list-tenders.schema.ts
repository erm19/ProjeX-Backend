import Joi from "joi";
import { baseListSchema } from "./base-list.schema";

export const listTendersSchema = baseListSchema
  .keys({
    cities: Joi.array().items(Joi.string().required()).optional(),
  })
  .unknown();
