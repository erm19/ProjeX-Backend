import { RootFilterQuery } from "mongoose";
import { ITender } from "../../domain/entities";
import { ITenderRepository } from "../../domain/repositories";
import { Tender } from "../orm";

export class MongoTenderRepository implements ITenderRepository {
  async create(tender: ITender): Promise<ITender> {
    const newTender = new Tender(tender);
    return await newTender.save();
  }
  async findById(id: string): Promise<ITender | null> {
    return await Tender.findById(id);
  }
  async list(filter: RootFilterQuery<ITender>): Promise<ITender[]> {
    return await Tender.find(filter, { title: true, type: true, parcels: true, endDate: true, city: true });
  }
}
