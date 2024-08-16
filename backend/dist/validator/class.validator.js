"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputUpdateClass = exports.validateInputCreateClass = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateInputCreateClass = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    trainer: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    maxParticipant: joi_1.default.number().min(1).required(),
});
exports.validateInputUpdateClass = joi_1.default.object({
    name: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    trainer: joi_1.default.string().optional(),
    maxParticipant: joi_1.default.number().min(1).optional(),
    date: joi_1.default.date().optional(),
});
