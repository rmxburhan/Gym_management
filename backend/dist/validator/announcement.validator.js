"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputUpdateAnnouncement = exports.validateInputPostAnnouncement = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateInputPostAnnouncement = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
});
exports.validateInputUpdateAnnouncement = joi_1.default.object({
    title: joi_1.default.string().optional(),
    content: joi_1.default.string().optional(),
});
