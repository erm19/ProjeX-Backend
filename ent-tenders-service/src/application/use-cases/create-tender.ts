import { CreateTender } from "../../core/types";
import { CreateTenderService } from "../../domain/services";

export class CreateTenderUseCase {
  private _createTender: CreateTenderService;

  constructor(createTenderService: CreateTenderService) {
    this._createTender = createTenderService;
  }

  async execute(tender: CreateTender) {
    return await this._createTender.execute(tender);
  }
}
