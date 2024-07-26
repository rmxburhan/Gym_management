import Transaction from "../models/transaction.model";
import { IUser } from "../models/user.model";

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

export default {
  getTransaction,
  getTransactions,
  getTransactionHistory,
};
