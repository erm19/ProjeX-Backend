import { CreateTender } from "../../core/types";
import { ITenderRepository, IUserRepository } from "../../domain/repositories";

export class CreateTenderService {
  private _userRepo: IUserRepository;
  private _tenderRepo: ITenderRepository;

  constructor(userRepository: IUserRepository, tenderRepository: ITenderRepository) {
    this._userRepo = userRepository;
    this._tenderRepo = tenderRepository;
  }

  async execute(tender: CreateTender) {
    const user = await this._userRepo.findByEmail(tender.username);

    if (!user) throw { status: 404, message: "User not found!" };

    return await this._tenderRepo.create({
      title: tender.title,
      username: user.id,
      tenderType: tender.tenderType,
      endDate: tender.endDate,
      hasInspector: tender.hasInspector,
      isPrivate: tender.isPrivate,
      parcels: tender.parcels,
      questionnaire: tender.questionnaire,
      city: tender.city,
    });
  }
}
