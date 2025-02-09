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
    intermediateGrade: { type: Number },
  },
  { collection: "ent-offers", timestamps: true }
);

OfferSchema.pre("save", async function () {
  const questionnaire = this.questionnaire;
  const totalQuestions = questionnaire.length - 1;

  const offerGrade = questionnaire.reduce((acc, { answer, remark }, index) => {
    if (index === 0) return acc; // Skip the first question

    let currentGrade = 0;
    if (typeof answer === "boolean") {
      currentGrade = answer ? 1 : 0;
    } else {
      currentGrade = 1;
    }

    if (remark) currentGrade *= 0.5;
    return acc + currentGrade;
  }, 0);

  this.intermediateGrade = (offerGrade / totalQuestions) * 0.7;
});

export const EntOffer = model<IOffer>("EntOffer", OfferSchema);
