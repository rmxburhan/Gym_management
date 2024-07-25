import { Document, Types } from "mongoose";
import { Schema } from "mongoose";
import { IAddress, addressSchema } from "./user.model";

export interface IMember extends Document {
  userId: Types.ObjectId;
  birthDate: Date;
  gender: "male" | "female";
  profile?: string;
  address: IAddress[];
  phoneNumber: string;
}

export const memberSchema = new Schema<IMember>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    profile: {
      type: String,
      required: false,
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
