import { ITender } from "../../domain/entities";
import { ITenderRepository } from "../../domain/repositories";
import { EntTender } from "../orm";

export class MongoTenderRepository implements ITenderRepository {
  async create(id: string, title: string): Promise<ITender> {
    const tender = new EntTender({ _id: id, title: title });
    return await tender.save();
  }

  async delete(id: string): Promise<void> {
    await EntTender.deleteOne({ _id: id });
  }
}
