import { ListTendersService } from "../../domain/services/list-tenders.service";
import { TenderService } from "../services";

export class ListTendersUseCase {
  constructor(private _tenders: TenderService) {}

  async execute(cities: string[], limit: number, lastId?: string) {
    return await this._tenders.list(cities, limit, lastId);
  }
}
