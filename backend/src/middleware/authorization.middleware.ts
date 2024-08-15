import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { RequestAuth } from "../types/request";
import tokenService from "../services/token.service";

const authorize = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization;
      if (!token) {
        const error = new Error("Token is empty");
        error.name = "BadRequest";
        throw error;
      }

      token = token!.split(" ")[1];

      const verified = tokenService.verifyToken(token);
      if (!verified) {
        return res.status(401).json({
          message: "Token invalid",
        });
      }

      const decoded: any = jwt.decode(token);
      console.log(decoded);
      const user = await User.findOne({
        _id: decoded._id,
        deletedAt: undefined,
      });

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }
      (req as RequestAuth).user = user;
      console.log("decode");
      next();
    } catch (error: any) {
      console.log(error);
      error.name = "Unauthorize";
      next(error);
    }
  };
};

export default authorize;
