import { OfferService } from "../services";

export class OffersByTenderUseCase {
  constructor(private _offers: OfferService) {}

  async execute(tenderId: string, limit: number, lastId?: string) {
    return await this._offers.getTenderOffers(tenderId, limit, lastId);
  }
}
