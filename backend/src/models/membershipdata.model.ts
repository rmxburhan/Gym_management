import { model, Schema, Types } from "mongoose";

export interface IMembershipData extends Document {
  memberId: Types.ObjectId;
  membershipId: Types.ObjectId;
  registerDate: Date;
  expiresDate: Date;
  status: boolean;
  deletedAt?: Date;
}

const membershipDataSchema = new Schema<IMembershipData>(
  {
    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    membershipId: {
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
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const MembershipData = model("MembershipData", membershipDataSchema);
export default MembershipData;
