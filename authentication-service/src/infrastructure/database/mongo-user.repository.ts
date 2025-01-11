import { SignupParams } from "../../core/types";
import { IUser } from "../../domain/entities";
import { IUserRepository } from "../../domain/repositories";
import { User } from "../orm";

export class MongoUserRepository implements IUserRepository {
  async create(
    user: Pick<SignupParams, "email" | "role" | "companyName" | "companyId" | "licenceNum">
  ): Promise<IUser> {
    const newUser = new User(user);
    return newUser.save();
  }
}
