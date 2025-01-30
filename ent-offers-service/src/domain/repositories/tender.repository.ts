import { ITender } from "../entities";

export interface ITenderRepository {
  create(id: string, title: string): Promise<ITender>;
  delete(id: string): Promise<void>;
}
