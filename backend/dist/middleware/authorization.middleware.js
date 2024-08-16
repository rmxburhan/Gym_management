"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const token_service_1 = __importDefault(require("../services/token.service"));
const authorize = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let token = req.headers.authorization;
            if (!token) {
                const error = new Error("Token is empty");
                error.name = "BadRequest";
                throw error;
            }
            token = token.split(" ")[1];
            const verified = token_service_1.default.verifyToken(token);
            if (!verified) {
                return res.status(401).json({
                    message: "Token invalid",
                });
            }
            const decoded = jsonwebtoken_1.default.decode(token);
            console.log(decoded);
            const user = yield user_model_1.default.findOne({
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
            req.user = user;
            console.log("decode");
            next();
        }
        catch (error) {
            console.log(error);
            error.name = "Unauthorize";
            next(error);
        }
    });
};
exports.default = authorize;
