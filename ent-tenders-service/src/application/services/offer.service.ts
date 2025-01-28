import { Schema } from "mongoose";
import { ITenderRepository } from "../../domain/repositories";
import { NotFoundError } from "@urbanix/error-handling";

export class OfferService {
  private _tenderRepo: ITenderRepository;

  constructor(tenderRepository: ITenderRepository) {
    this._tenderRepo = tenderRepository;
  }

  async handleOfferCreatedEvent(offerId: string, tenderId: string) {
    const tender = await this.findTenderById(tenderId);

    const offers = tender.offers || [];

    const offerIndex = offers.findIndex((offer) => offer.toString() === offerId);

    if (offerIndex === -1) {
      // Example logic: Save user to database
      console.log(`Saving user to local database: ID=${offerId}, tenderId=${tenderId}`);

      offers.push(new Schema.Types.ObjectId(offerId));
      await this._tenderRepo.updateOffers(tenderId, offers);
    }

    console.log(`User ${tenderId} updated with offer ${offerId}`);
  }

  async handleOfferDeletedEvent(offerId: string, tenderId: string) {
    const user = await this.findTenderById(tenderId);

    const offers = user.offers || [];

    const offerIndex = offers.findIndex((offer) => offer.toString() === offerId);

    if (offerIndex !== -1) {
      offers.splice(offerIndex, 1);
      await this._tenderRepo.updateOffers(tenderId, offers);
    }
  }

  private async findTenderById(tenderId: string) {
    const user = await this._tenderRepo.findById(tenderId);

    if (!user) {
      throw new NotFoundError(`User not found: ${tenderId}`);
    }

    return user;
  }
}
