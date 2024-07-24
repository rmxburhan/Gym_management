import { Request, Response } from "express";
import User from "../models/User";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

export const loginValidationRules = () => {
  return [
    body("email")
      .exists()
      .withMessage("email cannot be empty")
      .isString()
      .withMessage("email must be a string")
      .isEmail()
      .withMessage("email is invalid")
      .normalizeEmail(),
    body("password")
      .exists()
      .withMessage("password cannot be empty")
      .isString()
      .withMessage("password must be a string")
      .isLength({ min: 6 })
      .withMessage("password minimal must contain 6 characters")
      .trim(),
  ];
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email, deletedAt: undefined });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not registered!",
      });
    }

    var isMatch = await user.comparePassword(password);
    console.log("isMatch", isMatch);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect!",
      });
    }
    let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });
    return res.status(200).json({
      success: true,
      message: "Login successfull",
      data: {
        token,
        user,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};

export const registerValidationRules = () => {
  return [
    body("name")
      .exists()
      .withMessage("name cannot be empty")
      .isString()
      .withMessage("name must be a string")
      .trim()
      .escape(),

    body("email")
      .exists()
      .withMessage("email cannot be empty")
      .isEmail()
      .withMessage("please input valid email")
      .normalizeEmail(),

    body("password")
      .exists()
      .withMessage("password cannot be empty")
      .isString()
      .withMessage("password must be a string")
      .isLength({ min: 6 })
      .withMessage("password must be contain 6 characters")
      .trim(),

    body("dateOfBirth")
      .exists()
      .withMessage("date of birth cannot be empty")
      .isDate()
      .withMessage("date is invalid!")
      .trim(),

    body("gender")
      .exists()
      .withMessage("gender cannot be empty")
      .isString()
      .withMessage("gender must be a string")
      .isIn(["male", "female"])
      .withMessage("invalid gender input, valid option male | female")
      .trim(),

    body("address")
      .exists()
      .withMessage("addresss cannot be empty")
      .isString()
      .withMessage("address must be a string")
      .trim(),
  ];
};

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password, dateOfBirth, gender, image, address } =
      req.body;

    const isExist = await User.findOne({
      email: email,
      deletedAt: undefined,
    });

    if (isExist) {
      console.log(isExist);
      return res.status(400).json({
        success: false,
        message: "email already registered!",
      });
    }

    const user = new User({
      name,
      email,
      address,
      password,
      dateOfBirth,
      gender,
      role: "member",
    });

    const isSuccess = await user.save();

    if (!isSuccess) {
      return res.status(500).json({
        success: false,
        message: "failed to add user data",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Register success!",
      data: {
        user,
      },
    });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

export default {
  registerHandler,
  registerValidationRules,
  loginHandler,
  loginValidationRules,
};
