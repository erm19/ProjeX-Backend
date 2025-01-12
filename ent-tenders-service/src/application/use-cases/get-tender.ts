import { ITenderRepository } from "../../domain/repositories";

export class GetTenderUseCase {
  private _tenderRepo: ITenderRepository;

  constructor(tenderRepository: ITenderRepository) {
    this._tenderRepo = tenderRepository;
  }

  async execute(id: string) {
    return await this._tenderRepo.findById(id);
  }
}
