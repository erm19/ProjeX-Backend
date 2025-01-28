import { RootFilterQuery, Schema } from "mongoose";
import { ITender } from "../entities";
import { CreateTender } from "../../core/types";

export interface ITenderRepository {
  create(tender: CreateTender): Promise<ITender>;
  findById(id: string): Promise<ITender | null>;
  list(filter: RootFilterQuery<ITender>, limit: number): Promise<ITender[]>;
  updateOffers(tenderId: string, offers: Schema.Types.ObjectId[]): Promise<ITender | null>;
  delete(id: string): Promise<void>;
}
