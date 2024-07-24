import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { RequestAuth } from "../types/request";
const authorize = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      if (token[0] !== "Bearer") {
        return res.status(401).json({
          message: "Token invalid",
        });
      }

      const verified = jwt.verify(token[1], process.env.JWT_SECRET || "");

      if (!verified) {
        return res.status(401).json({
          message: "Token invalid",
        });
      }

      const decoded: any = jwt.decode(token[1]);

      if (decoded) {
        const user = await User.findOne({
          _id: decoded.id,
          deletedAt: undefined,
          Response,
        });
        if (!user) {
          return res.status(401).json({
            message: "Unauthorized",
          });
        }

        (req as RequestAuth).user = user;

        let allowed = false;

        if (!allowed) {
          return res.status(403).json({
            message: "Forbidden",
          });
        }
        next();
      }
    } catch (error) {
      return res.status(401).json({
        message: "Token is invalid",
      });
    }
  };
};

export default authorize;
