import Joi from "joi";
import { isValidObjectId } from "mongoose";

const parcelSchema = Joi.object({
  parcel: Joi.string().trim().required().messages({
    "string.empty": "Parcel cannot be empty",
    "any.required": "Parcel is required",
  }),
  sections: Joi.array()
    .items(
      Joi.string().trim().required().messages({
        "string.empty": "Section cannot be empty",
        "any.required": "Section is required",
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one section is required",
      "any.required": "Sections are required",
    }),
});

const questionnaireSchema = Joi.object({
  question: Joi.string().trim().required().messages({
    "string.empty": "Question cannot be empty",
    "any.required": "Question is required",
  }),
  type: Joi.string().allow("number", "boolean", "string").required().messages({
    "any.only": "Type must be one of number, boolean, or string",
    "any.required": "Type is required",
  }),
});

export const createTenderSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
  }),
  "x-username": Joi.string()
    .trim()
    .custom((value, helpers) => {
      if (value && !isValidObjectId(value)) return helpers.message({ custom: "Invalid user Id" });
      return value;
    })
    .messages({
      custom: "Invalid user Id",
    }),
  type: Joi.string().trim().required().messages({
    "string.empty": "Type cannot be empty",
    "any.required": "Type is required",
  }),
  endDate: Joi.date().required().messages({
    "date.base": "End date must be a valid date",
    "any.required": "End date is required",
  }),
  hasInspector: Joi.boolean().required().messages({
    "boolean.base": "Has inspector must be a boolean",
    "any.required": "Has inspector is required",
  }),
  private: Joi.boolean().required().messages({
    "boolean.base": "Private must be a boolean",
    "any.required": "Private is required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "City cannot be empty",
    "any.required": "City is required",
  }),
  parcels: Joi.array().items(parcelSchema).min(1).required().messages({
    "array.min": "At least one parcel is required",
    "any.required": "Parcels are required",
  }),
  questionnaire: Joi.array().items(questionnaireSchema).min(1).required().messages({
    "array.min": "At least one questionnaire item is required",
    "any.required": "Questionnaire is required",
  }),
}).unknown();
