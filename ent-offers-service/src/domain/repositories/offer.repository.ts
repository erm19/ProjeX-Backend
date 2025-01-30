import { RootFilterQuery } from "mongoose";
import { IOffer, IQuestionnaire } from "../entities";

export interface IOfferRepository {
  create(tenderId: string, username: string, questionnaire: IQuestionnaire[]): Promise<IOffer>;
  findByQuery(query: RootFilterQuery<IOffer>, limit: number): Promise<IOffer[]>;
  deleteById(id: string): Promise<void>;
  deleteByTenderId(tenderId: string): Promise<void>;
}
