"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputFillData = exports.addressValidationSchema = exports.validateRegisterInput = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateRegisterInput = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).max(50).required(),
});
exports.addressValidationSchema = joi_1.default.object({
    street: joi_1.default.string().min(5).max(250).required(),
    city: joi_1.default.string().max(250).required(),
    state: joi_1.default.string().max(250).required(),
    zip: joi_1.default.string().min(4).required(),
});
exports.validateInputFillData = joi_1.default.object({
    birthDate: joi_1.default.date().required(),
    gender: joi_1.default.string().required(),
    addresses: joi_1.default.array().min(1).items(exports.addressValidationSchema).required(),
    phoneNumber: joi_1.default.string().required(),
});
