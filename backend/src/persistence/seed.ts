import config from "../config";
import mongoose from "mongoose";
import User from "../models/user.model";
import { userData } from "./data/seed_data";

const seed = async () => {
  try {
    await mongoose.connect(config.mongo_uri);
    console.log("Connected to database");
    await User.deleteMany({});
    const users = User.insertMany(userData);
    console.log("Seed database succcess;");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

seed();
