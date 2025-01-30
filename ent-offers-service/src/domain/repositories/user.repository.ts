import { Schema } from "mongoose";
import { IUser } from "../entities";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  create(id: string, email: string): Promise<IUser>;
  update(id: string, offers: Schema.Types.ObjectId[]): Promise<IUser | null>;
  delete(id: string): Promise<void>;
}
