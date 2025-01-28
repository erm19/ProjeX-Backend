import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  email: string;
  role: string;
  licenseNum: string;
  companyName: string;
  companyNum: string;
  tenders: ObjectId[];
  offers: ObjectId[];
}
