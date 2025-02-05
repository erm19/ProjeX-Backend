import { ITender } from "../entities";

export interface ITenderRepository {
  create(id: string, questionnaire: string[]): Promise<ITender>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<ITender | null>;
}
