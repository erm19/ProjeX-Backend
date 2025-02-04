import Joi from "joi";

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().trim().required().messages({
    "string.empty": "Refresh token cannot be empty",
    "any.required": "Refresh token is required",
  }),
}).unknown();
