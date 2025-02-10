import { InternalServerError, NotFoundError, ValidationError } from "@urbanix/error-handling";
import { Types } from "mongoose";
import { RefTypes } from "../../core/types";
import { IOffer, IQuestionnaire } from "../../domain/entities";
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

    const { nextId, data } = await this._listByRef.execute(
      RefTypes.Creator,
      (user._id as Types.ObjectId).toString(),
      limit,
      lastId
    );

    const gradedData = await this.gradeOffers(data);

    return { nextId, data: gradedData };
  }

  async getTenderOffers(tenderId: string, limit: number, lastId?: string) {
    const { nextId, data } = await this._listByRef.execute(RefTypes.Tender, tenderId, limit, lastId);

    const gradedData = await this.gradeOffers(data, tenderId);

    return { nextId, data: gradedData };
  }

  private matchingQuestionnaire(tenderQuestionnaire: string[], offerQuestionnaire: string[]): boolean {
    if (tenderQuestionnaire.length !== offerQuestionnaire.length) return false;

    return offerQuestionnaire.every((question) => tenderQuestionnaire.some((tender) => tender === question));
  }

  private async resetMinMax(tenderId: string) {
    const offers = (await this.getTenderOffers(tenderId, 100)).data;

    const offerMeters = offers.map((offer) => offer.questionnaire[0].answer as number);

    const { min, max } = this.getArrayMinMax(offerMeters);

    await this._tenderRepo.updateMinMax(tenderId, min, max);
  }

  private getArrayMinMax(nums: number[]) {
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

  private async gradeOffers(offers: IOffer[], tenderId?: string) {
    let maxMinDiff: number;
    let minOffer: number;
    let maxOffer: number;

    if (tenderId) {
      const data = await this.getOfferParamsFromTender(tenderId);
      minOffer = data.minOffer;
      maxOffer = data.maxOffer;
      maxMinDiff = data.maxMinDiff;
    }

    return await Promise.all(
      offers.map(async ({ intermediateGrade, ...offer }) => {
        if (!tenderId) {
          const data = await this.getOfferParamsFromTender(offer.tenderId.toString());
          minOffer = data.minOffer;
          maxOffer = data.maxOffer;
          maxMinDiff = data.maxMinDiff;
        }
        const meters = offer.questionnaire[0].answer as number;
        const meterGrade = ((meters - minOffer) / maxMinDiff) * 0.3;
        return {
          ...offer,
          grade: intermediateGrade + meterGrade,
        } as IOffer & { grade: number };
      })
    );
  }

  private async getOfferParamsFromTender(tenderId: string) {
    const tenderFound = await this._tenderRepo.getById(tenderId);
    if (!tenderFound) throw new NotFoundError("Tender Not Found");

    const tender = tenderFound;

    if (!tender.minOffer || !tender.maxOffer)
      throw new InternalServerError("Tender should have minimum offer and maximum offer");

    const { minOffer, maxOffer } = tender;
    const maxMinDiff = maxOffer - minOffer;

    return { minOffer, maxOffer, maxMinDiff };
  }
}
