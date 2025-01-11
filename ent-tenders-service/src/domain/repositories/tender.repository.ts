import { ITender } from "../entities";

export interface ITenderRepository {
  create(): Promise<ITender>;
  findById(id: string): Promise<ITender | null>;
  list(): Promise<ITender[]>;
}
