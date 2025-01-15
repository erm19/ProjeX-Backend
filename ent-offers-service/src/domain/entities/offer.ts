import { Document, Types } from "mongoose";

export interface IQuestionnaire {
  questionId: Types.ObjectId;
  answer: number | boolean | string;
}

export interface IOffer extends Document {
  tenderId: Types.ObjectId;
  creator: Types.ObjectId;
  questionnaire: IQuestionnaire[];
  files: string[];
}
