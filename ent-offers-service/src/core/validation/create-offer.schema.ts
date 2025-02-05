import Joi from "joi";
import { isValidObjectId } from "mongoose";

const questionnaireSchema = Joi.object({
  questionId: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) return helpers.message({ custom: "Invalid question ID" });
      return value;
    }),
  answer: Joi.alternatives().try(Joi.string(), Joi.boolean(), Joi.number()).required().messages({
    "any.required": "Answer is required",
  }),
  remark: Joi.string().optional(),
});

export const createOfferSchema = Joi.object({
  tenderId: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) return helpers.message({ custom: "Invalid tender ID" });
      return value;
    }),
  "x-username": Joi.string().trim().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),
  questionnaire: Joi.array().items(questionnaireSchema).min(1).required().messages({
    "array.min": "At least one questionnaire item is required",
    "any.required": "Questionnaire is required",
  }),
}).unknown();
