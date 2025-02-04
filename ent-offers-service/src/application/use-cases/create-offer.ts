import { IQuestionnaire } from "../../domain/entities";
import { CreateOfferService } from "../../domain/services";
import { OfferService } from "../services";

export class CreateOfferUseCase {
  constructor(private _offer: OfferService) {}

  async execute(tenderId: string, username: string, questionnaire: IQuestionnaire[]) {
    return await this._offer.create(tenderId, username, questionnaire);
  }
}
