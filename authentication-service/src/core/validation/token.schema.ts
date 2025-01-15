import Joi from "joi";

export const tokenSchema = Joi.object({
  authorization: Joi.string().trim().required(),
});
