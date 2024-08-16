"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateTrainerInput = exports.validaAddTrainerInput = void 0;
const joi_1 = __importDefault(require("joi"));
const user_validator_1 = require("./user.validator");
exports.validaAddTrainerInput = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required().trim(),
    password: joi_1.default.string().min(6).max(50).required().trim(),
    addresses: joi_1.default.array()
        .items(user_validator_1.addressValidationSchema)
        .min(1)
        .max(2)
        .required(),
    gender: joi_1.default.string().valid("male", "female").required(),
    bank: joi_1.default.string().required(),
    bankNumber: joi_1.default.number().required(),
    identificationNumber: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string().min(6).required(),
});
exports.validateUpdateTrainerInput = joi_1.default.object({
    name: joi_1.default.string().optional(),
    email: joi_1.default.string().email().optional().trim(),
    password: joi_1.default.string().min(6).max(50).optional().trim(),
    addresses: joi_1.default.array()
        .items(user_validator_1.addressValidationSchema)
        .min(1)
        .max(2)
        .optional(),
    gender: joi_1.default.string().valid("male", "female").optional(),
    bank: joi_1.default.string().optional(),
    bankNumber: joi_1.default.number().optional(),
    identificationNumber: joi_1.default.string().optional(),
    phoneNumber: joi_1.default.string().min(6).optional(),
});
