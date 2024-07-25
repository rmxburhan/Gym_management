import { Document, model, Schema } from "mongoose";

export interface IMembershipSchema extends Document {
  name: string;
  description: string;
  duration: number;
  price: number;
  published: boolean;
  discountPrice: number;
  deletedAt?: Date;
}

const membershipSchema = new Schema<IMembershipSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 30,
    },
    price: {
      type: Number,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
      default: false,
    },
    discountPrice: {
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

const Membership = model("Membership", membershipSchema);

export default Membership;
