import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  role: string;
  licenseNum: string;
  companyName: string;
  companyNum: string;
}
