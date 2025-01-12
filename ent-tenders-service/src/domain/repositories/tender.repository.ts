import { RootFilterQuery } from "mongoose";
import { ITender } from "../entities";
import { CreateTender } from "../../core/types";

export interface ITenderRepository {
  create(tender: CreateTender): Promise<ITender>;
  findById(id: string): Promise<ITender | null>;
  list(filter: RootFilterQuery<ITender>): Promise<ITender[]>;
}
