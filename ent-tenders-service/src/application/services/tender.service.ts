import { CreateTender } from "../../core/types";
import { ITenderRepository, IUserRepository } from "../../domain/repositories";
import { CreateTenderService, ListTendersService } from "../../domain/services";
import { TenderEvents } from "../events/tender";

export class TenderService {
  private _tenderRepo: ITenderRepository;
  private _createTender: CreateTenderService;

  private _listTenders: ListTendersService;

  constructor(userRepository: IUserRepository, tenderRepository: ITenderRepository) {
    this._tenderRepo = tenderRepository;
    this._createTender = new CreateTenderService(userRepository, this._tenderRepo);
    this._listTenders = new ListTendersService(this._tenderRepo);
  }

  async createTender(data: CreateTender) {
    const tender = await this._createTender.execute(data);

    await TenderEvents.onTenderCreated({ id: tender.id, userId: tender.creator.toString() });

    return tender;
  }

  async list(cities: string[], limit: number, lastId?: string) {
    const listedTenders = await this._listTenders.execute(cities, limit, lastId);

    if (listedTenders.length > limit) {
      return {
        tenders: listedTenders.slice(listedTenders.length - 1),
        lastId: listedTenders[listedTenders.length - 1]._id,
      };
    }
    return { tenders: listedTenders, lastId: null };
  }

  async deleteTender(tenderId: string, userId: string) {
    await this._tenderRepo.delete(tenderId);

    await TenderEvents.onTenderDeleted({ id: tenderId, userId });
  }
}
