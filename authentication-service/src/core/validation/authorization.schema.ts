import Joi from "joi";
import { tokenSchema } from "./token.schema";

export const authoriztionSchema = tokenSchema.keys({
  roles: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())).required(),
});
