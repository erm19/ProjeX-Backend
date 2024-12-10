import { Document, model, Schema, Types } from "mongoose";
import { User } from "./user";

interface IQuestionnaire {
  questionId: Types.ObjectId;
  answer: number | boolean | string;
}

interface IOffer extends Document {
  tenderId: Types.ObjectId;
  creator: Types.ObjectId;
  questionnaire: IQuestionnaire[];
  files: string[];
}

const QuestionnaireSchema = new Schema<IQuestionnaire>({
  questionId: { type: Schema.Types.ObjectId, required: true },
  answer: { type: Schema.Types.Mixed, required: true },
});

const OfferSchema = new Schema<IOffer>(
  {
    tenderId: { type: Schema.Types.ObjectId, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    questionnaire: [QuestionnaireSchema],
    files: [{ type: String }],
  },
  { collection: "ent-offers", timestamps: true }
);

OfferSchema.post("save", async (offer) => {
  const user = await User.findOne({ _id: offer.creator }, { entOffers: true });
  user?.entOffers.push(offer._id as Types.ObjectId);
  await user?.save();
});

export const EntOffer = model<IOffer>("EntOffer", OfferSchema);
