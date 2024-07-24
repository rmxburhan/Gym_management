import mongoose from "mongoose";

export default async () => {
  await mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/gym_test")
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => console.error(err));
};
