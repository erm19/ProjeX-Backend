import { Document, model, Schema, Types } from "mongoose";

interface IUser extends Document {
  email: string;
  entOffers: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  entOffers: [{ type: Schema.Types.ObjectId, ref: "EntOffer" }],
});

export const User = model<IUser>("User", UserSchema);
