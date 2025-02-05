import { Schema } from "mongoose";
import { SignupParams } from "../../core/types";
import { IUser } from "../entities";

export interface IUserRepository {
  create(user: Pick<SignupParams, "email" | "role" | "companyName" | "companyId" | "licenceNum">): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  updateTenders(user: IUser, tenders: Schema.Types.ObjectId[]): Promise<void>;
  updateOffers(user: IUser, offers: Schema.Types.ObjectId[]): Promise<void>;
}
