import { IOfferRepository, ITenderRepository } from "../../domain/repositories";

export class TenderService {
  private _tenderRepo: ITenderRepository;
  private _offerRepo: IOfferRepository;

  constructor(tenderRepository: ITenderRepository, offerRepository: IOfferRepository) {
    this._tenderRepo = tenderRepository;
    this._offerRepo = offerRepository;
  }

  async handleCreatedEvent(data: { id: string }) {
    console.log(`Saving tender to database: ID=${data.id}`);

    await this._tenderRepo.create(data.id);

    console.log(`Tender ${data.id} created`);
  }

  async handleDeletedEvent(data: { id: string }) {
    console.log(`Deleting tender from database: ID=${data.id}`);

    await this._offerRepo.deleteByTenderId(data.id);
    await this._tenderRepo.delete(data.id);

    console.log(`Tender ${data.id} deleted`);
  }
}
