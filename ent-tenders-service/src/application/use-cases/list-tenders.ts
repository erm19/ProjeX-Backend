import { ITenderRepository } from "../../domain/repositories";
import { ListTendersService } from "../../domain/services/list-tenders.service";

export class ListTendersUseCase {
  private _listTenders: ListTendersService;

  constructor(listTendersService: ListTendersService) {
    this._listTenders = listTendersService;
  }

  async execute(cities: string[], limit: number, lastId?: string) {
    return await this._listTenders.execute(cities, limit, lastId);
  }
}
