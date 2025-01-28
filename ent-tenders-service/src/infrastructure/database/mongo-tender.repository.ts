import { RootFilterQuery, Schema } from "mongoose";
import { ITender } from "../../domain/entities";
import { ITenderRepository } from "../../domain/repositories";
import { Tender } from "../orm";
import { CreateTender } from "../../core/types";

export class MongoTenderRepository implements ITenderRepository {
  async create(tender: CreateTender): Promise<ITender> {
    const newTender = new Tender({
      title: tender.title,
      type: tender.tenderType,
      creator: tender.username,
      private: tender.isPrivate,
      hasInspector: tender.hasInspector,
      city: tender.city,
      parcels: tender.parcels,
      questionnaire: tender.questionnaire,
    });
    return await newTender.save();
  }
  async findById(id: string): Promise<ITender | null> {
    return await Tender.findById(id);
  }
  async list(filter: RootFilterQuery<ITender>, limit: number): Promise<ITender[]> {
    return await Tender.find(filter, { title: true, type: true, parcels: true, endDate: true, city: true })
      .sort({ _id: 1 })
      .limit(limit + 1);
  }

  async updateOffers(tenderId: string, offers: Schema.Types.ObjectId[]): Promise<ITender | null> {
    return await Tender.findByIdAndUpdate(tenderId, { offers: offers });
  }
}
