import { Date, Document, model, Schema, Types } from "mongoose";
import { QuestionType } from "../types";
import { User } from "./user";

interface IParcel {
  parcel: string;
  sections: string[];
}

interface IQuestionnaire {
  question: string;
  type: QuestionType;
}

interface ITender extends Document {
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

const ParcelSchema = new Schema<IParcel>({
  parcel: { type: String, required: true },
  sections: [{ type: String, required: true }],
});

const QuestionnaireSchema = new Schema<IQuestionnaire>({
  question: { type: String, required: true },
  type: { type: String, enum: Object.values(QuestionType), required: true },
});

const TenderSchema = new Schema<ITender>({
  title: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  endDate: { type: Date, required: true },
  hasInspector: { type: Boolean, required: true },
  private: { type: Boolean, required: true },
  city: { type: String, required: true },
  parcels: [ParcelSchema],
  questionnaire: [QuestionnaireSchema],
  files: [{ type: String }],
});

TenderSchema.post("save", async (tender) => {
  const user = await User.findOne({ _id: tender.creator }, { tenders: true });
  user?.tenders.push(tender._id as Types.ObjectId);
  await user?.save();
});

export const Tender = model<ITender>("Tender", TenderSchema);
