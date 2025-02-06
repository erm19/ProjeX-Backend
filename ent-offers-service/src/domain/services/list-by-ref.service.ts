import { ValidationError } from "@urbanix/error-handling";
import { isValidObjectId, RootFilterQuery } from "mongoose";
import { RefType, RefTypes } from "../../core/types";
import { IOffer } from "../entities";
import { IOfferRepository } from "../repositories";

export class ListByRefService {
  private _offerRepo: IOfferRepository;

  constructor(offerRepository: IOfferRepository) {
    this._offerRepo = offerRepository;
  }

  async execute(refType: RefType, reference: string, limit: number = 20, lastId?: string) {
    const queryFilter: RootFilterQuery<IOffer> = {};

    if (!isValidObjectId(reference)) throw new ValidationError("Invalid Reference Id");

    if (refType === RefTypes.Tender) queryFilter.tenderId = reference;

    if (refType === RefTypes.Creator) queryFilter.creator = reference;

    if (lastId && isValidObjectId(lastId)) queryFilter._id = { $gte: lastId };

    const data = await this._offerRepo.findByQuery(queryFilter, limit);

    if (data.length > limit) {
      return { nextId: data[data.length - 1]._id, data: data.slice(0, limit) };
    }

    return { nextId: null, data };
  }
}
