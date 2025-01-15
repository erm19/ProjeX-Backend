import Joi from "joi";
import { isValidObjectId } from "mongoose";

const questionnaireSchema = Joi.object({
  questionId: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) return helpers.message({ message: "Invalid tender ID" });
      return value;
    }),
  answer: Joi.alternatives().try(Joi.string(), Joi.boolean(), Joi.number()).required(),
});

export const createOfferSchema = Joi.object({
  tenderId: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) return helpers.message({ message: "Invalid tender ID" });
      return value;
    }),
  "x-username": Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) return helpers.message({ message: "Invalid user ID" });
      return value;
    }),
  questionnaire: Joi.array().items(questionnaireSchema).min(1).required(),
});
