import { InternalServerError, NotFoundError, ValidationError } from "@urbanix/error-handling";
import { Types } from "mongoose";
import { RefTypes } from "../../core/types";
import { IQuestionnaire } from "../../domain/entities";
import { IOfferRepository, ITenderRepository, IUserRepository } from "../../domain/repositories";
import { CreateOfferService, ListByRefService } from "../../domain/services";
import { OfferEvent } from "../events";

export class OfferService {
  private _createOffer: CreateOfferService;
  private _listByRef: ListByRefService;

  constructor(
    private _offerRepo: IOfferRepository,
    private _tenderRepo: ITenderRepository,
    private _userRepo: IUserRepository
  ) {
    this._createOffer = new CreateOfferService(this._userRepo, this._offerRepo);
    this._listByRef = new ListByRefService(this._offerRepo);
  }
  async create(tenderId: string, username: string, questionnaire: IQuestionnaire[]) {
    const tender = await this._tenderRepo.getById(tenderId);

    if (!tender) throw new NotFoundError("Tender Not Found!");

    const tenderQuestionnaire = tender.questionnaire.map((q) => q.toString());
    const offerQuestionnaire = questionnaire.map((q) => q.questionId.toString());

    if (!this.matchingQuestionnaire(tenderQuestionnaire, offerQuestionnaire))
      throw new ValidationError("Offer must answer tender questionnaire");

    const offer = await this._createOffer.execute(tenderId, username, questionnaire);

    await this._tenderRepo.updateMinMaxFromOffer(tenderId, questionnaire[0].answer as number);

    await OfferEvent.onOfferCreated(offer);

    return offer;
  }

  async deleteById(id: string) {
    const offer = await this._offerRepo.findById(id);

    if (!offer) throw new NotFoundError("Offer Not Found");

    await this._offerRepo.deleteById(id);

    await this.resetMinMax(offer.tenderId.toString());

    await OfferEvent.onOfferDeleted(offer);
  }

  async getUserOffers(creator: string, limit: number, lastId?: string) {
    const user = await this._userRepo.findByEmail(creator);

    if (!user) throw new NotFoundError("User Not Found");

    return await this._listByRef.execute(RefTypes.Creator, (user._id as Types.ObjectId).toString(), limit, lastId);
  }

  async getTenderOffers(tenderId: string, limit: number, lastId?: string) {
    return await this._listByRef.execute(RefTypes.Tender, tenderId, limit, lastId);
  }

  private matchingQuestionnaire(tenderQuestionnaire: string[], offerQuestionnaire: string[]): boolean {
    if (tenderQuestionnaire.length !== offerQuestionnaire.length) return false;

    return offerQuestionnaire.every((question) => tenderQuestionnaire.some((tender) => tender === question));
  }

  private async resetMinMax(tenderId: string) {
    const offers = (await this.getTenderOffers(tenderId, 100)).data;

    const offerMeters = offers.map((offer) => offer.questionnaire[0].answer as number);

    const { min, max } = this.getMinMax(offerMeters);

    await this._tenderRepo.updateMinMax(tenderId, min, max);
  }

  private getMinMax(nums: number[]) {
    if (nums.length === 0) {
      throw new InternalServerError("Array must not be empty");
    }

    let min = nums[0];
    let max = nums[0];

    for (let i = 1; i < nums.length; i++) {
      if (nums[i] < min) {
        min = nums[i];
      } else if (nums[i] > max) {
        max = nums[i];
      }
    }

    return { min, max };
  }
}
