import Joi from "joi";
import { isValidObjectId } from "mongoose";

const questionnaireSchema = Joi.object({
  questionId: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) return helpers.message({ custom: "Invalid question ID" });
      return value;
    })
    .messages({
      custom: "Invalid question ID",
    }),
  answer: Joi.alternatives().try(Joi.string(), Joi.boolean(), Joi.number()).required().messages({
    "any.required": "Answer is required",
  }),
});

export const createOfferSchema = Joi.object({
  tenderId: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) return helpers.message({ custom: "Invalid tender ID" });
      return value;
    })
    .messages({
      custom: "Invalid tender ID",
    }),
  "x-username": Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) return helpers.message({ custom: "Invalid user ID" });
      return value;
    })
    .messages({
      custom: "Invalid user ID",
    }),
  questionnaire: Joi.array().items(questionnaireSchema).min(1).required().messages({
    "array.min": "At least one questionnaire item is required",
    "any.required": "Questionnaire is required",
  }),
}).unknown();
