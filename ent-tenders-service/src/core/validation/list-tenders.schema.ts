import Joi from "joi";
import { baseListSchema } from "./base-list.schema";

export const listTendersSchema = baseListSchema
  .keys({
    cities: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())).optional(),
  })
  .unknown();
