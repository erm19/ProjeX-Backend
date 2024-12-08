import { Document, model, Schema, Types } from "mongoose";

interface IUser extends Document {
  email: string;
  tenders: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  tenders: [{ type: Schema.Types.ObjectId, ref: "Tender" }],
});

export const User = model<IUser>("User", UserSchema);
