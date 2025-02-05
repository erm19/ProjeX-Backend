import { model, Schema } from "mongoose";
import { ITender } from "../../domain/entities";

const TenderSchema = new Schema<ITender>(
  {
    questionnaire: [{ type: Schema.Types.ObjectId }],
  },
  { collection: "tenders" }
);

export const EntTender = model<ITender>("EntTender", TenderSchema);
