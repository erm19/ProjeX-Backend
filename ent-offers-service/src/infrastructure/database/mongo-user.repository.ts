import { Schema } from "mongoose";
import { IUser } from "../../domain/entities";
import { IUserRepository } from "../../domain/repositories";
import { User } from "../orm";

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email: email });
  }

  async create(id: string, email: string): Promise<IUser> {
    return await User.create({ id, email });
  }

  async update(id: string, offers: Schema.Types.ObjectId[]): Promise<IUser | null> {
    return await User.findOneAndUpdate({ id }, { entOffers: offers });
  }

  async delete(id: string): Promise<void> {
    await User.deleteOne({ id });
  }
}
