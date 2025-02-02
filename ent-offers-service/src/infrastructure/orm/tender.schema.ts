import { model, Schema } from "mongoose";
import { ITender } from "../../domain/entities";

const TenderSchema = new Schema<ITender>({
  title: { type: String },
});

export const EntTender = model<ITender>("EntTender", TenderSchema);
