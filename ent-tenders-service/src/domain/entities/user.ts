import { Document, Types } from "mongoose";

export interface IUser extends Document {
  email: string;
  entTenders: Types.ObjectId[];
}
