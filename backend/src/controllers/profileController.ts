import fs from "fs";
import path from "path";
import { body } from "express-validator";
import User from "../models/User";
import { NextFunction, Request, Response } from "express";
import { RequestAuth } from "../types/request";

export const updateProfileRules = () => {
  return [
    body("name").optional().isString().withMessage("Name must be a string"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("email is not valid")
      .normalizeEmail(),
    body("address").optional(),
    body("gender")
      .optional()
      .isIn(["male", "female"])
      .withMessage("gender must be a male or female")
      .trim(),
    body("oldPassword").optional().isLength({ min: 6 }).trim(),
    body("newPassword").optional().isLength({ min: 6 }).trim(),
    body("dateOfBirth")
      .optional()
      .isDate()
      .withMessage("birth date is not valid"),
  ];
};

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as RequestAuth).user;
    const userData = await User.populate(user, { path: "memberDetail" });
    return res.status(200).json({
      success: true,
      data: {
        profile: user,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as RequestAuth).user;
    const imageFile = req.file;
    if (imageFile == undefined) {
      return res.status(400).json({
        success: false,
        message: "Image is empty",
      });
    }

    user.image = imageFile.path;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "saved",
    });
  } catch (error: any) {
    if (error)
      return res.status(500).json({
        success: false,
        error: error.message,
      });
  }
};

export const getProfileImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as RequestAuth).user;
    const pathImage = path.join(process.cwd(), user.image);
    if (!fs.existsSync(pathImage)) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
    return res.sendFile(pathImage);
  } catch (error: any) {
    if (error)
      return res.status(500).json({
        success: false,
        error: error.message,
      });
  }
};

export const updateMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      email,
      address,
      gender,
      dateOfBirth,
      oldPassword,
      newPassword,
    } = req.body;
    const profile = (req as RequestAuth).user;

    if (name) profile.name = name;
    if (email) profile.email = email;
    if (address) profile.address = address;
    if (gender) profile.gender = gender;
    if (dateOfBirth) profile.dateOfBirth = new Date(dateOfBirth);
    if (oldPassword && newPassword) {
      const isMatch = await profile.comparePassword(oldPassword);
      if (isMatch) {
        profile.password = newPassword;
      } else {
        return res.status(400).json({
          success: false,
          message: "Update profile failed. oldPassword is incorrect",
        });
      }
    }

    await profile.save();
    return res.status(200).json({
      success: true,
      message: "Update profile success",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export default {
  getMyProfile,
  updateProfileImage,
  getProfileImage,
  updateMyProfile,
  updateProfileRules,
};
