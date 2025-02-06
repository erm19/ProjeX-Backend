import { TenderService } from "../services";

export class MyTendersUseCase {
  constructor(private _tenders: TenderService) {}

  async execute(username: string, limit: number, lastId?: string) {
    return await this._tenders.myTenders(username, limit, lastId);
  }
}
