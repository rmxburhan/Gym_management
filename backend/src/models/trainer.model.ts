import { Schema, model } from "mongoose";
import { IAddress, addressSchema } from "./user.model";

export interface ITrainer extends Document {
  identificationNumber: string;
  phoneNumber: string;
  address: IAddress[];
  bank: string;
  bankNumber: number;
}

export const trainerSchema = new Schema<ITrainer>({
  identificationNumber: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: [addressSchema],
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  bankNumber: {
    type: Number,
    required: true,
  },
});
