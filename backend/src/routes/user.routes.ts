import { NextFunction, Request, Response, Router } from "express";
import {
  validateInputFillData,
  validateRegisterInput,
} from "../validator/user.validator";
import userService from "../services/user.service";
import { validationResult } from "express-validator";
import { RequestAuth } from "../types/request";
import authorize from "../middleware/authorization.middleware";
import { uploadSingle } from "../utils/upload";
import path from "path";
import { existsSync, unlinkSync } from "fs";

const route = Router();

route.get(
  "/",
  authorize(["admin", "member", "trainer", "staff"]),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestAuth).user;
      return res.status(200).json({
        message: "User data succes retrieved.",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  "/profile",
  authorize(["admin", "member", "trainer", "staff"]),
  uploadSingle("profile"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestAuth).user;
      const profile = req.file;
      if (!profile) {
        const error = new Error("profile picture doesn't exist");
        error.name = "BadRequest";
        throw error;
      }
      user.profile = profile.path;
      await user.save();
      return res.status(200).json({
        message: "profile picture has been updated",
      });
    } catch (error) {
      if (req.file) {
        const pathToFile = path.join(process.cwd(), req.file.path);
        if (existsSync(pathToFile)) {
          unlinkSync(pathToFile);
        }
      }
      next(error);
    }
  }
);

// for updating user information
// route.patch()

route.put(
  "/detail",
  authorize(["member"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestAuth).user;

      if (user.memberDetail) {
        const error = new Error("Request cannot be proceed");
        error.name = "BadRequest";
        throw error;
      }

      const { error, value } = validateInputFillData.validate(req.body);
      if (error) throw error;
      const { gender, addresses, phoneNumber, birthDate } = value;

      const data = userService.fillData(
        user.id,
        gender,
        addresses,
        phoneNumber,
        new Date(birthDate)
      );

      return res.status(200).json({
        message: "Personal information has been filled",
      });
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = validateRegisterInput.validate(req.body);
      if (error) throw error;

      const {
        name,
        email,
        password,
      }: { name: string; email: string; password: string } = value;

      const userData = userService.createUser({
        name,
        email,
        password,
        role: "member",
      });

      const user = await userService.postRegister(userData);

      return res.status(200).json({
        message: "Register success",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default route;
