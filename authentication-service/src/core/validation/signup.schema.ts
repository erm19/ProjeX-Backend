import Joi from "joi";

export const SignupSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(8).required(),
  role: Joi.string().valid("lawyer", "entrepreneur").required(),
  companyName: Joi.string().trim().required(),
  officeName: Joi.string().trim().when("role", whereClause("lawyer")),
  licenceNum: Joi.string().trim().when("role", whereClause("lawyer")),
  companyNum: Joi.string().trim().when("role", whereClause("entrepreneur")),
  companyRole: Joi.string().trim().when("role", whereClause("entrepreneur")),
});

function whereClause(type: string): Joi.WhenOptions {
  return {
    is: type,
    then: Joi.required(),
    otherwise: Joi.optional(),
  };
}
