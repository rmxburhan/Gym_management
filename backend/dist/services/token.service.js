"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.verifyToken = exports.generateToken = void 0;
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => jsonwebtoken_1.default.sign(user.toObject(), config_1.default.jwtSecret || "Test", {
    expiresIn: process.env.JWT_LIFETIME || "1h",
    issuer: config_1.default.jwtIssuer,
});
exports.generateToken = generateToken;
const verifyToken = (token) => jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret || "Test", {
    issuer: config_1.default.jwtIssuer,
});
exports.verifyToken = verifyToken;
const decodeToken = (token) => jsonwebtoken_1.default.decode(token);
exports.decodeToken = decodeToken;
exports.default = {
    generateToken: exports.generateToken,
    verifyToken: exports.verifyToken,
    decodeToken: exports.decodeToken,
};
