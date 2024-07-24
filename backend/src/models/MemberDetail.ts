import { Document, Types } from "mongoose";
import { model, Schema, SchemaType } from "mongoose";

export interface IMembershipDetail extends Document {
  memberId: Types.ObjectId;
  weight: number;
  height: number;
  fat: number;
  deletedAt?: Date;
}

const memberDetailSchema = new Schema<IMembershipDetail>(
  {
    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    weight: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    // percentage
    fat: {
      type: Number,
      required: false,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const MemberDetail = model("MemberDetail", memberDetailSchema);
export default MemberDetail;
