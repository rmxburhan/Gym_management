import { Schema, Types } from "mongoose";

export interface IMembershipData extends Document {
  membership: Types.ObjectId;
  registerDate: Date;
  expiresDate: Date;
  status: boolean;
}

export const membershipDataSchema = new Schema<IMembershipData>(
  {
    membership: {
      type: Schema.Types.ObjectId,
      ref: "Membership",
      required: true,
    },
    registerDate: {
      type: Date,
      required: true,
    },
    expiresDate: {
      type: Date,
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

membershipDataSchema.virtual("status").get(function () {
  return this.expiresDate > new Date();
});
