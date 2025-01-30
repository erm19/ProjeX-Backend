import { RootFilterQuery } from "mongoose";
import { IOffer, IQuestionnaire } from "../../domain/entities";
import { IOfferRepository } from "../../domain/repositories";
import { EntOffer } from "../orm";

export class MongoOfferRepository implements IOfferRepository {
  async create(tenderId: string, username: string, questionnaire: IQuestionnaire[]): Promise<IOffer> {
    const offer = new EntOffer({ tenderId: tenderId, creator: username, questionnaire: questionnaire });
    return await offer.save();
  }

  async findByQuery(query: RootFilterQuery<IOffer>, limit: number): Promise<IOffer[]> {
    return EntOffer.find(query)
      .sort({ _id: 1 })
      .limit(limit + 1);
  }

  async deleteById(id: string): Promise<void> {
    await EntOffer.deleteOne({ _id: id });
  }

  async deleteByTenderId(tenderId: string): Promise<void> {
    await EntOffer.deleteMany({ tenderId: tenderId });
  }
}
