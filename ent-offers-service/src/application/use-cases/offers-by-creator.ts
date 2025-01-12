import { RefTypes } from "../../core/types";
import { ListByRefService } from "../../domain/services";

export class OffersByCreatorUseCase {
  private _listByRef: ListByRefService;

  constructor(listByRefService: ListByRefService) {
    this._listByRef = listByRefService;
  }

  async execute(creatorId: string, limit: number, lastId?: string) {
    return await this._listByRef.execute(RefTypes.Creator, creatorId, limit, lastId);
  }
}
