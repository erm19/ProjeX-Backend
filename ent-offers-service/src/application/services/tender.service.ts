import { IOfferRepository, ITenderRepository } from "../../domain/repositories";

export class TenderService {
  private _tenderRepo: ITenderRepository;
  private _offerRepo: IOfferRepository;

  constructor(tenderRepository: ITenderRepository, offerRepository: IOfferRepository) {
    this._tenderRepo = tenderRepository;
    this._offerRepo = offerRepository;
  }

  async handleCreatedEvent(data: { tenderId: string }) {
    console.log(`Saving tender to database: ID=${data.tenderId}`);

    await this._tenderRepo.create(data.tenderId);

    console.log(`Tender ${data.tenderId} created`);
  }

  async handleDeletedEvent(data: { tenderId: string }) {
    console.log(`Deleting tender from database: ID=${data.tenderId}`);

    await this._offerRepo.deleteByTenderId(data.tenderId);
    await this._tenderRepo.delete(data.tenderId);

    console.log(`Tender ${data.tenderId} deleted`);
  }
}
