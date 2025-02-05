import { OfferService } from "../services";

export class OffersByCreatorUseCase {
  constructor(private _offers: OfferService) {}

  async execute(creatorId: string, limit: number, lastId?: string) {
    return await this._offers.getUserOffers(creatorId, limit, lastId);
  }
}
