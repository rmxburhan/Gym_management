import config from "../config";
import mongoose from "mongoose";
import User from "../models/user.model";
import { userData } from "./data/seed_data";
import Settings from "../models/settings.model";
import bcrypt from "bcryptjs";

const seed = async () => {
  try {
    await mongoose.connect(config.mongo_uri);
    console.log("Connected to database");
    await User.deleteMany({});
    const saltGen = bcrypt.genSaltSync(10);
    const hashedUserData = userData.map((user) => {
      user.password = bcrypt.hashSync(user.password, saltGen);
      return user;
    });
    User.insertMany(hashedUserData);
    await Settings.deleteMany({});
    await Settings.create({
      app_name: "Gym management system",
    });
    console.log("Seed database succcess;");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

seed();
