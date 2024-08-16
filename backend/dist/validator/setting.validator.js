"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputPatchSettings = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateInputPatchSettings = joi_1.default.object({
    update: joi_1.default.object({
        app_name: joi_1.default.string().optional(),
        lat: joi_1.default.string().optional(),
        lng: joi_1.default.string().optional(),
        timezone: joi_1.default.string().optional(),
    }),
});
