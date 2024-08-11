import mongoose from "mongoose";
import config from "../config";

export default async () => {
  await mongoose
    .connect(config.mongo_uri)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => console.error(err));
};
