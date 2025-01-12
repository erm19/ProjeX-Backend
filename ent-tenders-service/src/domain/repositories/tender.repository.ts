import { RootFilterQuery } from "mongoose";
import { ITender } from "../entities";

export interface ITenderRepository {
  create(tender: ITender): Promise<ITender>;
  findById(id: string): Promise<ITender | null>;
  list(filter: RootFilterQuery<ITender>): Promise<ITender[]>;
}
