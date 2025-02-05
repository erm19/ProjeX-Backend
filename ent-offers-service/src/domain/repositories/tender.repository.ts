import { ITender } from "../entities";

export interface ITenderRepository {
  create(id: string, questionnaire: string[]): Promise<ITender>;
  delete(id: string): Promise<void>;
}
