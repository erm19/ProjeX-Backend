import Joi from "joi";
import { isValidObjectId } from "mongoose";

const parcelSchema = Joi.object({
  parcel: Joi.string().trim().required(),
  sections: Joi.array().items(Joi.string().trim().required()).min(1).required(),
});

const questionnaireSchema = Joi.object({
  question: Joi.string().trim().required(),
  type: Joi.string().allow("number", "boolean", "string").required(),
});

export const createTenderSchema = Joi.object({
  title: Joi.string().trim().required(),
  "x-username": Joi.string()
    .trim()
    .custom((value, helpers) => {
      if (value && !isValidObjectId(value)) return helpers.message({ message: "Invalid user Id" });
      return value;
    }),
  type: Joi.string().trim().required(),
  endDate: Joi.date().required(),
  hasInspector: Joi.boolean().required(),
  private: Joi.boolean().required(),
  city: Joi.string().required(),
  parcels: Joi.array().items(parcelSchema).min(1).required(),
  questionnaire: Joi.array().items(questionnaireSchema).min(1).required(),
});
