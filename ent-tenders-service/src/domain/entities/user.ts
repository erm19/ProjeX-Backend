import { Types } from "mongoose";

export interface IUser {
  email: string;
  tenders: Types.ObjectId[];
}
