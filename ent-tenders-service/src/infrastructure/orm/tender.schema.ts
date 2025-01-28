import { Schema, Types, model } from "mongoose";
import { IParcel, IQuestionnaire, ITender } from "../../domain/entities";
import { User } from "./user.schema";
import { QuestionType } from "../../core/types";

const ParcelSchema = new Schema<IParcel>({
  parcel: { type: String, required: true },
  sections: [{ type: String, required: true }],
});

const QuestionnaireSchema = new Schema<IQuestionnaire>({
  question: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.trim() !== ""; // Ensure non-empty strings
      },
      message: "Question cannot be empty.",
    },
  },
  type: { type: String, enum: Object.values(QuestionType), required: true },
});

const TenderSchema = new Schema<ITender>({
  title: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true, enum: ["renewal", "tama"] },
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
  user?.entTenders.push(tender._id as Types.ObjectId);
  await user?.save();
});

export const Tender = model<ITender>("Tender", TenderSchema);
