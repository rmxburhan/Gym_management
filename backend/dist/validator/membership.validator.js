"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputRegisterMembership = exports.validateUpdateMembershipInput = exports.validateCreateMembershipInput = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateCreateMembershipInput = joi_1.default.object({
    name: joi_1.default.string().min(4).required(),
    description: joi_1.default.string().min(4).max(4096).required(),
    price: joi_1.default.number().required(),
    duration: joi_1.default.number().min(7).required(),
    discountPrice: joi_1.default.number().optional(),
});
exports.validateUpdateMembershipInput = joi_1.default.object({
    name: joi_1.default.string().min(4).optional(),
    description: joi_1.default.string().min(4).max(4096).optional(),
    price: joi_1.default.number().optional(),
    duration: joi_1.default.number().min(7).optional(),
    discountPrice: joi_1.default.number().optional(),
    published: joi_1.default.boolean().optional(),
});
exports.validateInputRegisterMembership = joi_1.default.object({
    membershipId: joi_1.default.string().required(),
    paymentType: joi_1.default.string().required(),
});
