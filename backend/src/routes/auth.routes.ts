import { NextFunction, Request, Response, Router } from "express";

import { loginValidationRules } from "../validator/auth.validator";
import { validationResult } from "express-validator";
import tokenService from "../services/token.service";
import authService from "../services/auth.service";
const route = Router();

route.post(
  "/login",
  loginValidationRules,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = Error(errors.array()[0].msg);
        error.name = "BadRequest";
        throw error;
      }
      const { email, password }: { email: string; password: string } = req.body;

      const user = await authService.postLogin({ email, password });
      const token = tokenService.generateToken(user);

      return res.status(200).json({
        message: "Login success",
        token,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default route;
