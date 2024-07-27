import User, { IUser, UserQuery } from "../models/user.model";

export const postRegister = async (user: IUser) => {
  const emailExist = await User.findOne({ email: user.email });
  if (emailExist) {
    const error = new Error();
    error.name = "Email already taken. please use another email";
    throw error;
  }
  await user.save();
};

export const createUser = ({
  email,
  password,
  name,
  role,
}: Pick<IUser, "email" | "password" | "name" | "role">): IUser =>
  new User({ name, email, password, role });

export const getUser = async (query: UserQuery) => {
  query.deletedAt = undefined;
  return await User.findOne(query);
};

export const fillData = async (
  userId: string,
  gender: string,
  addresses: any,
  phoneNumber: string,
  birthDate: Date
) =>
  await User.findByIdAndUpdate(userId, {
    memberDetail: {
      address: addresses,
      phoneNumber,
      gender,
      birthDate,
    },
  });

export default {
  postRegister,
  createUser,
  getUser,
  fillData,
};
