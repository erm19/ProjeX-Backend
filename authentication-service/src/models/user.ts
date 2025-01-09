import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  role: string;
  licenseNum: string;
  companyName: string;
  companyNum: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
  role: { type: String, required: true, enum: ["lawyer", "entrepreneur"] },
  companyName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.trim() !== ""; // Ensure non-empty strings
      },
      message: "Company name cannot be empty.",
    },
  },
  licenseNum: { type: String },
  companyNum: { type: String },
});

UserSchema.path("licenseNum").validate(function (value) {
  // Only validate if the role is 'lawyer'
  if (this.role === "lawyer") {
    // Check if licenseNum is empty
    return value && value.trim() !== "";
  }
  return true; // No validation needed if role is not 'lawyer'
}, "License number is required when role is lawyer.");

UserSchema.path("companyNum").validate(function (value) {
  // Only validate if the role is 'lawyer'
  if (this.role === "entrepreneur") {
    // Check if licenseNum is empty
    return value && value.trim() !== "";
  }
  return true; // No validation needed if role is not 'lawyer'
}, "Company number is required when role is entrepreneur.");

export const User = model<IUser>("User", UserSchema);
