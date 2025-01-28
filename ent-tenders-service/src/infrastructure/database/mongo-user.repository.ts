import { Schema } from "mongoose";
import { IUser } from "../../domain/entities";
import { IUserRepository } from "../../domain/repositories";
import { User } from "../orm";

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email: email });
  }

  async create(id: string, email: string): Promise<IUser> {
    return await User.create({ _id: id, email });
  }

  async update(id: string, tenders: Schema.Types.ObjectId[]): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, { entTenders: tenders });
  }

  async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }
}
