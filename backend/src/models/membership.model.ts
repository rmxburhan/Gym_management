import { Document, model, Schema } from "mongoose";

export interface IMembership extends Document {
  name: string;
  description: string;
  duration: number;
  price: number;
  published: boolean;
  discountPrice: number;
  deletedAt?: Date;
}

const membershipSchema = new Schema<IMembership>(
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

const Membership = model("Membership", membershipSchema);

export default Membership;
