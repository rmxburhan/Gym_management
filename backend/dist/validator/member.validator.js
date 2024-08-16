"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputUpdateMember = exports.validateInputAddMember = void 0;
const joi_1 = __importDefault(require("joi"));
const user_validator_1 = require("./user.validator");
exports.validateInputAddMember = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    birthDate: joi_1.default.date().required(),
    gender: joi_1.default.string(),
    addresses: joi_1.default.array().items(user_validator_1.addressValidationSchema).required(),
    phoneNumber: joi_1.default.string().required(),
});
exports.validateInputUpdateMember = joi_1.default.object({
    name: joi_1.default.string().optional(),
    email: joi_1.default.string().optional(),
    password: joi_1.default.string().optional(),
    birthDate: joi_1.default.date().optional(),
    gender: joi_1.default.string(),
    addresses: joi_1.default.array().items(user_validator_1.addressValidationSchema).optional(),
    phoneNumber: joi_1.default.string().optional(),
});
