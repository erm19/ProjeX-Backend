import { IParcel, IQuestionnaire } from "../../domain/entities";

export type CreateTender = {
  title: string;
  username: string;
  tenderType: string;
  endDate: Date;
  hasInspector: boolean;
  isPrivate: boolean;
  parcels: IParcel[];
  questionnaire: IQuestionnaire[];
  city: string;
};
