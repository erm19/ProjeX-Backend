import { NotFoundError } from "@urbanix/error-handling";
import { isValidObjectId, RootFilterQuery, Types } from "mongoose";
import { CreateTender } from "../../core/types";
import { ITender } from "../../domain/entities";
import { ITenderRepository, IUserRepository } from "../../domain/repositories";
import { CreateTenderService, ListTendersService } from "../../domain/services";
import { TenderEvents } from "../events/tender";

export class TenderService {
  private _createTender: CreateTenderService;

  private _listTenders: ListTendersService;

  constructor(private _userRepo: IUserRepository, private _tenderRepo: ITenderRepository) {
    this._createTender = new CreateTenderService(this._userRepo, this._tenderRepo);
    this._listTenders = new ListTendersService(this._tenderRepo);
  }

  async createTender(data: CreateTender) {
    const tender = await this._createTender.execute(data);
    const questionnaire = tender.questionnaire.map((question) => (question._id as Types.ObjectId).toString());

    await TenderEvents.onTenderCreated({ id: tender.id, userId: tender.creator.toString(), questionnaire });

    return tender;
  }

  async list(cities: string[], limit: number, lastId?: string) {
    const listedTenders = await this._listTenders.execute(cities, limit, lastId);

    if (listedTenders.length > limit) {
      return {
        nextId: listedTenders[listedTenders.length - 2]._id,
        tenders: listedTenders.slice(limit),
      };
    }
    return { tenders: listedTenders, nextId: null };
  }

  async deleteTender(tenderId: string, userId: string) {
    await this._tenderRepo.delete(tenderId);

    await TenderEvents.onTenderDeleted({ id: tenderId, userId });
  }

  async myTenders(username: string, limit: number, lastId?: string) {
    const user = await this._userRepo.findByEmail(username);

    if (!user) throw new NotFoundError("User Not Found");

    const queryFilter: RootFilterQuery<ITender> = { creator: user._id as Types.ObjectId };

    if (lastId && isValidObjectId(lastId)) queryFilter._id = { $gte: lastId };

    const listedTenders = await this._tenderRepo.list(queryFilter, limit);

    if (listedTenders.length > limit) {
      return {
        nextId: listedTenders[listedTenders.length - 2]._id,
        tenders: listedTenders.slice(limit),
      };
    }
    return { tenders: listedTenders, nextId: null };
  }
}
