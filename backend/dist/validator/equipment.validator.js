"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputAddEquipmentLog = exports.validateInputUpdateEquipment = exports.validateInputAddEquipment = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateInputAddEquipment = joi_1.default.object({
    name: joi_1.default.string().required(),
    qty: joi_1.default.number().required(),
});
exports.validateInputUpdateEquipment = joi_1.default.object({
    name: joi_1.default.string().optional(),
    qty: joi_1.default.number().optional(),
});
exports.validateInputAddEquipmentLog = joi_1.default.object({
    category: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
});
