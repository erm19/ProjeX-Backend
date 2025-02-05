import { Schema } from "mongoose";
import { SignupParams } from "../../core/types";
import { IUser } from "../../domain/entities";
import { IUserRepository } from "../../domain/repositories";
import { User } from "../orm";

export class MongoUserRepository implements IUserRepository {
  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async create(
    user: Pick<SignupParams, "email" | "role" | "companyName" | "companyId" | "licenceNum">
  ): Promise<IUser> {
    const newUser = new User(user);
    return newUser.save();
  }

  async updateTenders(user: IUser, tenders: Schema.Types.ObjectId[]): Promise<void> {
    user.entTenders = tenders;
    await user.save();
  }

  async updateOffers(user: IUser, offers: Schema.Types.ObjectId[]): Promise<void> {
    user.entOffers = offers;
    await user.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }
}
