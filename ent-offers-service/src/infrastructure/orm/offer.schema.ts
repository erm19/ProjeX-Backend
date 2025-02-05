import { Schema, model } from "mongoose";
import { IOffer, IQuestionnaire } from "../../domain/entities";

const QuestionnaireSchema = new Schema<IQuestionnaire>({
  questionId: { type: Schema.Types.ObjectId, required: true },
  answer: { type: Schema.Types.Mixed, required: true },
  remark: { type: String },
});

const OfferSchema = new Schema<IOffer>(
  {
    tenderId: { type: Schema.Types.ObjectId, ref: "EntTender", required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    questionnaire: [QuestionnaireSchema],
    files: [{ type: String }],
  },
  { collection: "ent-offers", timestamps: true }
);

export const EntOffer = model<IOffer>("EntOffer", OfferSchema);
