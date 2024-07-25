import User, { IUser } from "../models/user.model";

export const postLogin = async (credentials: {
  email: string;
  password: string;
}): Promise<IUser> => {
  const user = await User.findOne({
    email: credentials.email,
    deletedAt: undefined,
  });

  if (!user) {
    const error = Error("Email is not registered!");
    error.name = "NotFound";
    throw error;
  }

  var isMatch = user.comparePassword(credentials.password);

  if (!isMatch) {
    const error = new Error("Password is not match.");
    error.name = "BadRequest";
    throw error;
  }

  return user;
};

export default {
  postLogin,
};
