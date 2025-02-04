import { NotFoundError } from "@urbanix/error-handling";
import { IQuestionnaire } from "../../domain/entities";
import { IOfferRepository } from "../../domain/repositories";
import { OfferEvent } from "../events";
import { CreateOfferService } from "../../domain/services";

export class OfferService {
  constructor(private _offerRepo: IOfferRepository, private _createOffer: CreateOfferService) {}
  async create(tenderId: string, username: string, questionnaire: IQuestionnaire[]) {
    const offer = await this._createOffer.execute(tenderId, username, questionnaire);

    await OfferEvent.onOfferCreated(offer);

    return offer;
  }

  async deleteById(id: string) {
    const offer = await this._offerRepo.findById(id);

    if (!offer) throw new NotFoundError("Offer Not Found");

    await this._offerRepo.deleteById(id);

    await OfferEvent.onOfferDeleted(offer);
  }
}
