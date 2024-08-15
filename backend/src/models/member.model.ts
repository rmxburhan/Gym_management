import { Document, Types } from "mongoose";
import { Schema } from "mongoose";
import { IAddress, addressSchema } from "./user.model";
import { IMembershipData, membershipDataSchema } from "./membershipdata.model";

export interface IMember extends Document {
  birthDate: Date;
  gender: "male" | "female";
  address: IAddress[];
  phoneNumber: string;
  membership?: IMembershipData | null;
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
    membership: {
      type: membershipDataSchema,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
