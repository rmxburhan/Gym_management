import dayjs from "dayjs";
import Membership, { IMembership } from "../models/membership.model";
import Transaction from "../models/transaction.model";
import { IUser } from "../models/user.model";
import { nextDay } from "date-fns";

export const getMemberships = async (member?: boolean) => {
  const filter: { deletedAt: undefined; published?: boolean } = {
    deletedAt: undefined,
  };
  if (member) filter.published = true;
  return await Membership.find(filter).sort({
    createdAt: -1,
  });
};

export const addMembership = async (
  name: string,
  description: string,
  duration: number,
  price: number,
  discountPrice: number
): Promise<IMembership | null> =>
  Membership.create({
    name,
    description,
    duration,
    price,
    discountPrice,
  });

export const getMembershipById = async (id: string, member?: boolean) => {
  const filter: { _id: string; deletedAt: undefined; published?: boolean } = {
    _id: id,
    deletedAt: undefined,
  };

  if (member) filter.published = true;

  return await Membership.findOne(filter);
};
export const patchPublishStatus = async (id: string): Promise<IMembership> => {
  const membership = await Membership.findOne({
    _id: id,
    deletedAt: undefined,
  });
  if (!membership) {
    const error = new Error("Change publish membership failed. Id not found");
    error.name = "NotFound";
    throw error;
  }
  membership.published = !membership.published;
  return await membership.save();
};

export const updateMembership = async (
  id: string,
  name: string,
  description: string,
  duration: number,
  price: number,
  discountPrice: number
) => {
  const membership = await Membership.findOne({
    _id: id,
    deletedAt: undefined,
  });

  if (!membership) {
    const error = new Error("Update membership failed, Id not found");
    error.name = "NotFound";
    throw error;
  }

  if (name) membership.name = name;
  if (description) membership.description = description;
  if (duration) membership.duration = duration;
  if (price) membership.price = price;
  if (discountPrice) membership.discountPrice = discountPrice;
  return await membership.save();
};

export const deleteMembership = async (id: string) => {
  const membership = await Membership.findOne({
    _id: id,
    deletedAt: undefined,
  });

  if (!membership) {
    const error = new Error("Delete membership failed. Id not found");
    error.name = "NotFound";
    throw error;
  }

  membership.deletedAt = dayjs().toDate();
  return await membership.save();
};

export const registerMembership = async (
  user: IUser,
  membershipId: string,
  paymentType: string
) => {
  const membership = await Membership.findOne({
    _id: membershipId,
    deletedAt: undefined,
    published: true,
  });

  if (!membership) {
    const error = new Error("Membership data not found");
    error.name = "BadRequest";
    throw error;
  }

  const currentTransaction = await Transaction.findOne({
    membership: membershipId,
    $and: [{ status: "pending" }, { paymentExpire: { $gt: dayjs().toDate() } }],
    member: user.id,
  }).sort({ createdAt: -1 });

  if (currentTransaction) {
    const error = new Error(
      "You are have pending transaction first cancel first to make a new transaction"
    );
    error.name = "BadRequest";
    throw error;
  }
  return await Transaction.create({
    member: user.id,
    membership: membership.id,
    paymentType,
    totalPayment: membership.price - membership.discountPrice,
    status: "pending",
    paymentExpire: dayjs().add(1, "day"),
  });
};

export default {
  getMemberships,
  addMembership,
  getMembershipById,
  patchPublishStatus,
  updateMembership,
  deleteMembership,
  registerMembership,
};
