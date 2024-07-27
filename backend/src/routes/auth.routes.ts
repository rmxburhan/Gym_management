import { NextFunction, Request, Response, Router } from "express";

import { validateLoginInput } from "../validator/auth.validator";
import tokenService from "../services/token.service";
import authService from "../services/auth.service";
const route = Router();

route.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = validateLoginInput.validate(req.body);
      if (error) throw error;
      const { email, password }: { email: string; password: string } = value;

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
