import { CreateTender } from "../../core/types";
import { TenderService } from "../services";

export class CreateTenderUseCase {
  constructor(private _tenders: TenderService) {}

  async execute(tender: CreateTender) {
    return await this._tenders.createTender(tender);
  }
}
