import User from "../models/User";

export default async () => {
  try {
    const admin = await User.findOne({
      role: "admin",
      deletedAt: undefined,
    });

    if (admin) {
      console.log("admin already exist");
    }

    const adminNew = new User({
      name: "admin",
      role: "admin",
      email: "admin@admin.com",
      password: "password",
      address: "asd",
      image: undefined,
      dateOfBirth: new Date(),
    });

    await adminNew.save();
    console.log("seed success");
  } catch (error) {
    console.log(error);
  }
};
