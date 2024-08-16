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
const express_1 = require("express");
const auth_validator_1 = require("../validator/auth.validator");
const token_service_1 = __importDefault(require("../services/token.service"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const route = (0, express_1.Router)();
route.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = auth_validator_1.validateLoginInput.validate(req.body);
        if (error)
            throw error;
        const { email, password } = value;
        const user = yield auth_service_1.default.postLogin({ email, password });
        const token = token_service_1.default.generateToken(user);
        return res.status(200).json({
            message: "Login success",
            token,
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = route;
