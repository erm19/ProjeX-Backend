import { NotFoundError, ValidationError } from "@urbanix/error-handling";
import { IQuestionnaire } from "../../domain/entities";
import { IOfferRepository, ITenderRepository } from "../../domain/repositories";
import { CreateOfferService } from "../../domain/services";
import { OfferEvent } from "../events";

export class OfferService {
  constructor(
    private _offerRepo: IOfferRepository,
    private _createOffer: CreateOfferService,
    private _tenderRepo: ITenderRepository
  ) {}
  async create(tenderId: string, username: string, questionnaire: IQuestionnaire[]) {
    const tender = await this._tenderRepo.getById(tenderId);

    if (!tender) throw new NotFoundError("Tender Not Found!");

    const tenderQuestionnaire = tender.questionnaire.map((q) => q.toString());
    const offerQuestionnaire = questionnaire.map((q) => q.questionId.toString());

    if (!this.matchingQuestionnaire(tenderQuestionnaire, offerQuestionnaire))
      throw new ValidationError("Offer must answer tender questionnaire");

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

  private matchingQuestionnaire(tenderQuestionnaire: string[], offerQuestionnaire: string[]): boolean {
    if (tenderQuestionnaire.length !== offerQuestionnaire.length) return false;

    return offerQuestionnaire.every((question) => tenderQuestionnaire.some((tender) => tender === question));
  }
}
