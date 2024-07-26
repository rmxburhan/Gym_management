import { Document, Types } from "mongoose";
import { Schema } from "mongoose";
import { IAddress, addressSchema } from "./user.model";

export interface IMember extends Document {
  birthDate: Date;
  gender: "male" | "female";
  address: IAddress[];
  phoneNumber: string;
}

export const memberSchema = new Schema<IMember>(
  {
    birthDate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    address: {
      type: [addressSchema],
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
