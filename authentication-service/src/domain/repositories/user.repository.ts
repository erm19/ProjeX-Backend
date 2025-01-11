import { SignupParams } from "../../core/types";
import { IUser } from "../entities";

export interface IUserRepository {
  create(user: Pick<SignupParams, "email" | "role" | "companyName" | "companyId" | "licenceNum">): Promise<IUser>;
}
