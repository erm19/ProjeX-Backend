import { ObjectId } from "mongoose";
import { IQuestionnaire } from "../entities";
import { IOfferRepository, IUserRepository } from "../repositories";

export class CreateOfferService {
  private _userRepo: IUserRepository;
  private _offerRepo: IOfferRepository;

  constructor(userRepository: IUserRepository, offerRepository: IOfferRepository) {
    this._userRepo = userRepository;
    this._offerRepo = offerRepository;
  }

  async execute(tenderId: string, username: string, questionnaire: IQuestionnaire[]) {
    const user = await this._userRepo.findByEmail(username);

    if (!user) throw { status: 404, message: "User not found!" };

    return await this._offerRepo.create(tenderId, (user._id as ObjectId).toString(), questionnaire);
  }
}
