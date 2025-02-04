import Joi from "joi";

export const SignupSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),
  password: Joi.string().trim().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
  }),
  role: Joi.string().valid("lawyer", "entrepreneur").required().messages({
    "any.only": "Role must be either 'lawyer' or 'entrepreneur'",
    "any.required": "Role is required",
  }),
  officeName: Joi.string().trim().when("role", whereClause("lawyer")).messages({
    "any.required": "Office name is required for lawyers",
  }),
  licenceNum: Joi.string().trim().when("role", whereClause("lawyer")).messages({
    "any.required": "Licence number is required for lawyers",
  }),
  companyName: Joi.string().trim().when("role", whereClause("entrepreneur")).messages({
    "any.required": "Company name is required for entrepreneurs",
  }),
  companyNum: Joi.string().trim().when("role", whereClause("entrepreneur")).messages({
    "any.required": "Company number is required for entrepreneurs",
  }),
  companyRole: Joi.string().trim().when("role", whereClause("entrepreneur")).messages({
    "any.required": "Company role is required for entrepreneurs",
  }),
}).unknown();

function whereClause(type: string): Joi.WhenOptions {
  return {
    is: type,
    then: Joi.required(),
    otherwise: Joi.optional(),
  };
}
