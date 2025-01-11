import { Schema, model } from "mongoose";
import { IUser } from "../../domain/entities";

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
  tenders: [{ type: Schema.Types.ObjectId, ref: "Tender" }],
});

export const User = model<IUser>("User", UserSchema);
