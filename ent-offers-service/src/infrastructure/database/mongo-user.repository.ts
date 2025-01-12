import { IUser } from "../../domain/entities";
import { IUserRepository } from "../../domain/repositories";
import { User } from "../orm";

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email: email });
  }
}
