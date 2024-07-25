import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminNew = await User.create({
      name: "admin",
      role: "admin",
      email: "admin@admin.com",
      password: "password",
    });
  } catch (error) {
    console.log(error);
  }
  try {
    const trainerNew = await User.create({
      name: "trainer",
      role: "trainer",
      email: "trainer@trainer.com",
      password: "password",
    });
  } catch (error) {}
  const staffNew = await User.create({
    name: "staff",
    role: "staff",
    email: "staff@staff.com",
    password: "password",
  });
  try {
    const memberNew = await User.create({
      name: "member",
      role: "member",
      email: "member@member.com",
      password: "password",
    });
  } catch (error) {}
  try {
    console.log("Seed admin success");
  } catch (error) {}
  return res.status(200).json({
    message: "seed success",
  });
};
