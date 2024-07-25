import { IUser } from "../models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
export const generateToken = (user: IUser) =>
  jwt.sign(user.toObject(), process.env.JWT_SECRET || "test", {
    expiresIn: process.env.JWT_LIFETIME || "1h",
    issuer: process.env.JWT_ISSUER || "rmxburhan.site",
  });

export const verifyToken = (token: string): string | JwtPayload =>
  jwt.verify(token, process.env.JWT_SECRET || "test", {
    issuer: process.env.JWT_ISSUER,
  });

export const decodeToken = (token: string) => jwt.decode(token);

export default {
  generateToken,
  verifyToken,
  decodeToken,
};
