import { IUser } from "../entities";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
}
