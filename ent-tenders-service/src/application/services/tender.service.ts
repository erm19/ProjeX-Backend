import { CreateTender } from "../../core/types";
import { ITenderRepository } from "../../domain/repositories";
import { CreateTenderService } from "../../domain/services";
import { TenderEvents } from "../events/tender";

export class TenderService {
  constructor(private _createTender: CreateTenderService, private _tenderRepo: ITenderRepository) {}

  async createTender(data: CreateTender) {
    const tender = await this._createTender.execute(data);

    await TenderEvents.onTenderCreated({ id: tender.id, userId: tender.creator.toString() });

    return tender;
  }

  async deleteTender(tenderId: string, userId: string) {
    await this._tenderRepo.delete(tenderId);

    await TenderEvents.onTenderDeleted({ id: tenderId, userId });
  }
}
