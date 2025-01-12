import { isValidObjectId } from "mongoose";
import { ITenderRepository } from "../repositories";

export class ListTendersService {
  private _tenderRepo: ITenderRepository;

  constructor(tenderRepository: ITenderRepository) {
    this._tenderRepo = tenderRepository;
  }

  async execute(citiesFilter: string[], limit: number, lastId?: string) {
    const queryFilter: { city?: Object; _id?: Object } = {};

    if (citiesFilter.length) {
      queryFilter.city = { $in: citiesFilter };
    }

    if (lastId && isValidObjectId(lastId)) {
      queryFilter._id = { $gt: lastId };
    }

    return await this._tenderRepo.list(queryFilter, limit);
  }
}
