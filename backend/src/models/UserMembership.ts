import { model, Schema, SchemaType, Types } from "mongoose";

export interface IUserMembership extends Document {
  memberId: Types.ObjectId;
  membershipId: Types.ObjectId;
  registerDate: Date;
  expiresDate: Date;
  status: boolean;
  deletedAt?: Date;
}

const userMembershipSchema = new Schema<IUserMembership>(
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

const UserMembership = model("UserMembership", userMembershipSchema);
export default UserMembership;
