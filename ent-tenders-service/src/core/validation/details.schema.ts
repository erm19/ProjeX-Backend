import Joi from "joi";
import { isValidObjectId } from "mongoose";

export const detailsSchema = Joi.object({
  tenderId: Joi.string()
    .trim()
    .custom((value, helpers) => {
      if (value && !isValidObjectId(value)) return helpers.message({ message: "Invalid tender Id" });
      return value;
    }),
});
