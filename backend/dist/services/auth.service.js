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
exports.postLogin = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const postLogin = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({
        email: credentials.email,
        deletedAt: undefined,
    });
    if (!user) {
        const error = Error("Email is not registered!");
        error.name = "NotFound";
        throw error;
    }
    var isMatch = user.comparePassword(credentials.password);
    if (!isMatch) {
        const error = new Error("Password is not match.");
        error.name = "BadRequest";
        throw error;
    }
    return user;
});
exports.postLogin = postLogin;
exports.default = {
    postLogin: exports.postLogin,
};
