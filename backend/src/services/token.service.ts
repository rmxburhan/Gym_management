import config from "../config";
import type { IUser } from "../models/user.model";
import jwt, { type JwtPayload } from "jsonwebtoken";
export const generateToken = (user: IUser) =>
	jwt.sign(user.toObject(), config.jwtSecret || "Test", {
		expiresIn: process.env.JWT_LIFETIME || "1h",
		issuer: config.jwtIssuer,
	});

export const verifyToken = (token: string): string | JwtPayload =>
	jwt.verify(token, config.jwtSecret || "Test", {
		issuer: config.jwtIssuer,
	});

export const decodeToken = (token: string) => jwt.decode(token);

export default {
	generateToken,
	verifyToken,
	decodeToken,
};
