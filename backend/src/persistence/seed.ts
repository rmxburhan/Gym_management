import config from "../config";
import mongoose from "mongoose";
import User from "../models/user.model";
import { userData } from "./data/seed_data";
import Settings from "../models/settings.model";

const seed = async () => {
  try {
    await mongoose.connect(config.mongo_uri);
    console.log("Connected to database");
    await User.deleteMany({});
    const users = User.insertMany(userData);
    await Settings.deleteMany({});
    Settings.create({
      app_name: "Gym management system",
    });
    console.log("Seed database succcess;");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

seed();
