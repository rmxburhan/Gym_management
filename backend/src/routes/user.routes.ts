import { NextFunction, Request, Response, Router } from "express";
import { registerValidationRules } from "../validator/user.validator";
import userService from "../services/user.service";
import { validationResult } from "express-validator";
import { RequestAuth } from "../types/request";
import authorize from "../middleware/authorization.middleware";
import { uploadSingle } from "../utils/upload";
import path from "path";
import { exists, existsSync, unlinkSync } from "fs";

const route = Router();

route.get(
  "/user",
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
  "/user/profile",
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

route.post(
  "/register",
  registerValidationRules,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.name = "BadRequest";
        throw error;
      }

      const {
        name,
        email,
        password,
      }: { name: string; email: string; password: string } = req.body;

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
