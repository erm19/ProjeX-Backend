import { RefTypes } from "../../core/types";
import { ListByRefService } from "../../domain/services";

export class OffersByTenderUseCase {
  private _listByRef: ListByRefService;

  constructor(listByRefService: ListByRefService) {
    this._listByRef = listByRefService;
  }

  async execute(tenderId: string, limit: number, lastId?: string) {
    return await this._listByRef.execute(RefTypes.Tender, tenderId, limit, lastId);
  }
}
