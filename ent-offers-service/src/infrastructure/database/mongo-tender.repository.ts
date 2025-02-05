import { ITender } from "../../domain/entities";
import { ITenderRepository } from "../../domain/repositories";
import { EntTender } from "../orm";

export class MongoTenderRepository implements ITenderRepository {
  async create(id: string, questionnaire: string[]): Promise<ITender> {
    const tender = new EntTender({ _id: id, questionnaire });
    return await tender.save();
  }

  async delete(id: string): Promise<void> {
    await EntTender.deleteOne({ _id: id });
  }

  async getById(id: string): Promise<ITender | null> {
    return await EntTender.findById(id);
  }
}
