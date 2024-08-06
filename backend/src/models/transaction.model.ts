import { Schema, Types, model } from "mongoose";

export interface ITransaction extends Document {
  member: Types.ObjectId;
  membership: Types.ObjectId;
  totalPayment: number;
  paymentType: string;
  paymentExpire: Date;
  status: "pending" | "success" | "failed";
}

const transactionSchema = new Schema<ITransaction>(
  {
    member: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    membership: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Membership",
    },
    totalPayment: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    paymentExpire: {
      type: Date,
      required: true,
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

const Transaction = model("Transaction", transactionSchema);
export default Transaction;
