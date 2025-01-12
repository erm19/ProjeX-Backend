import { isValidObjectId, RootFilterQuery } from "mongoose";
import { IOfferRepository } from "../repositories";
import { IOffer } from "../entities";
import { RefType, RefTypes } from "../../core/types";

export class ListByRefService {
  private _offerRepo: IOfferRepository;

  constructor(offerRepository: IOfferRepository) {
    this._offerRepo = offerRepository;
  }

  async execute(refType: RefType, reference: string, limit: number = 20, lastId?: string) {
    const queryFilter: RootFilterQuery<IOffer> = {};

    if (!isValidObjectId(reference)) throw { status: 400, message: "Invalid reference id" };

    if (refType === RefTypes.Tender) queryFilter.tenderId = reference;

    if (refType === RefTypes.Creator) queryFilter.creator = reference;

    if (lastId && isValidObjectId(lastId)) queryFilter._id = { $gt: lastId };

    const data = await this._offerRepo.findByQuery(queryFilter, limit);

    if (data.length > limit) {
      return { nextId: data[data.length - 2]._id, data: data.slice(0, limit) };
    }

    return { nextId: null, data };
  }
}
