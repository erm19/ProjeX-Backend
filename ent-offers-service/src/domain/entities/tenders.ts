import { Document, Types } from "mongoose";

export interface ITender extends Document {
  questionnaire: Types.ObjectId[];
  minOffer?: number;
  maxOffer?: number;
}
