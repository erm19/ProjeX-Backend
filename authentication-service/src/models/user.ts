import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  role: string;
  licenseNum: string;
  companyName: string;
  companyNum: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  companyName: { type: String, required: true },
  licenseNum: { type: String },
  companyNum: { type: String },
});

export const User = model<IUser>("User", UserSchema);
