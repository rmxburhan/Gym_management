import dayjs from "dayjs";
import { membershipDataSchema } from "../models/membershipdata.model";
import Transaction from "../models/transaction.model";
import User, { IUser } from "../models/user.model";
import { Types } from "mongoose";
import Membership from "../models/membership.model";

export const getTransactions = async () => {
  return await Transaction.find()
    .sort({ createdAt: -1 })
    .populate("membership", "name description duration");
};

export const getTransaction = async (id: string, user: IUser) => {
  const filter: { _id: string; member?: string } = { _id: id };
  if (user.role === "member") filter.member = user.id;
  return await Transaction.findOne(filter);
};

export const getTransactionHistory = async (memberId: string) => {
  return await Transaction.find({ member: memberId }).sort({ createdAt: -1 });
};

export const acceptPayment = async (transactionId: string) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    const error = new Error("Operation fialed. Id not found");
    error.name = "NotFound";
    throw error;
  }

  if (
    transaction.status !== "pending" ||
    transaction.paymentExpire < new Date()
  ) {
    const error = new Error("Operation failed. transaction is not valid");
    error.name = "BadRequest";
    throw error;
  }

  transaction.status = "success";
  await transaction.save();
  const membership = await Membership.findById(transaction.membership);
  return await User.findByIdAndUpdate(transaction.member, {
    $set: {
      "memberDetail.membership": {
        membership: membership!.id,
        registerDate: dayjs(),
        expiresDate: dayjs().add(membership!.duration, "day"),
      },
    },
  });
};

export default {
  getTransaction,
  getTransactions,
  getTransactionHistory,
  acceptPayment,
};
