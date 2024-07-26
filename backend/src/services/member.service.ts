import dayjs from "dayjs";
import User, { UserQuery } from "../models/user.model";
import { exists } from "fs";

export const getMembers = async ({
  name,
  gender,
  active,
}: {
  name?: string;
  gender?: string;
  active?: string;
}) => {
  const filter: {
    deletedAt: any;
    name?: any;
    gender?: string;
    role: string;
  } = {
    deletedAt: undefined,
    role: "member",
  };

  if (name) filter.name = { $regex: "^" + name };

  if (gender == "male") filter.gender = "male";
  else if (gender == "female") filter.gender = "female";

  let members = await User.find(filter).sort({ createdAt: -1 });
  //   .populate({
  //     path: "membershipDetail",
  // match: { expiresDate: { $gte: new Date() } },
  //   });

  //   if (active != undefined) {
  //     if (active == "false" || active == "0") {
  //       dataResponse = dataResponse.filter(
  //         (x) => x.membershipDetail?.length == 0
  //       );
  //     } else if (active == "true" || active == "1") {
  //       dataResponse = dataResponse.filter(
  //         (x) => x.membershipDetail?.length != 0
  //       );
  //     }
  //   }

  return members;
};

export const getMember = async (id: string) =>
  await User.findOne({ _id: id, deletedAt: undefined, role: "member" });

export const deleteMember = async (id: string) => {
  const member = await User.findOne({
    _id: id,
    deletedAt: undefined,
    role: "member",
  });

  if (!member) {
    const error = new Error("Delete member failed. Id not found");
    error.name = "NotFound";
    throw error;
  }

  member.deletedAt = dayjs().toDate();

  return await member.save();
};

export const addMember = async (
  name: string,
  password: string,
  email: string,
  addresses: any,
  birthDate: Date,
  gender: "male" | "female",
  phoneNumber: string,
  profile?: Express.Multer.File
) => {
  const exist = await User.findOne({ email, deletedAt: undefined });
  if (exist) {
    const error = new Error("Email already taken. try another email");
    error.name = "BadRequest";
    throw error;
  }
  const member = new User({
    name,
    password,
    email,
    role: "member",
    memberDetail: {
      address: addresses,
      birthDate,
      gender,
      phoneNumber,
    },
  });

  if (profile) {
    member.profile = profile.path.split("public/")[1];
  }

  return await member.save();
};

export const updateMember = async (
  id: string,
  name?: string,
  password?: string,
  email?: string,
  addresses?: any,
  birthDate?: Date,
  gender?: "male" | "female",
  phoneNumber?: string,
  profile?: Express.Multer.File
) => {
  const exist = await User.findOne({ _id: id, deletedAt: undefined });

  if (!exist) {
    const error = new Error("Update member failed. Id not found");
    error.name = "BadRequest";
    throw error;
  }

  if (name) exist.name = name;
  if (password) exist.password = password;
  if (email) exist.email = email;
  if (addresses) exist.memberDetail!.address = addresses;
  if (birthDate) exist.memberDetail!.birthDate = birthDate;
  if (gender) exist.memberDetail!.gender = gender;
  if (phoneNumber) exist.memberDetail!.phoneNumber = phoneNumber;
  if (profile) exist.profile = profile.path.split("public/")[1];
  return await exist.save();
};

export default {
  getMembers,
  getMember,
  deleteMember,
  addMember,
  updateMember,
};
