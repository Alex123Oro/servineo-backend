import { CreateOfferInput } from "./newOfferInput";
import { IJobOffer } from "../models/newJobOffer.model";

export interface JobOfferRepository {
  save(_offer: CreateOfferInput): Promise<{ insertedId: string }>;
  findAll(): Promise<IJobOffer[]>;
  findByFixerId(_fixerId: string): Promise<IJobOffer[]>;
  update(_offerId: string, _data: Partial<CreateOfferInput>): Promise<IJobOffer | null>;
  delete(_offerId: string): Promise<void>;
}