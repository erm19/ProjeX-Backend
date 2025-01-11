import { Types } from "mongoose";
import { QuestionType } from "../../core/types";

export interface IParcel {
  parcel: string;
  sections: string[];
}

export interface IQuestionnaire {
  question: string;
  type: QuestionType;
}

export interface ITender extends Document {
  title: string;
  creator: Types.ObjectId;
  type: string;
  endDate: Date;
  questionnaire: IQuestionnaire[];
  parcels: IParcel[];
  city: string;
  hasInspector: boolean;
  private: boolean;
  files: string[];
}
