import { IQuestionnaire } from "../../domain/entities";
import { CreateOfferService } from "../../domain/services";

export class CreateOfferUseCase {
  private _createOffer: CreateOfferService;

  constructor(createOfferService: CreateOfferService) {
    this._createOffer = createOfferService;
  }

  async execute(tenderId: string, username: string, questionnaire: IQuestionnaire[]) {
    return await this._createOffer.execute(tenderId, username, questionnaire);
  }
}
