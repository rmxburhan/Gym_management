"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFilterAttendancesStats = exports.validatePostCheckIn = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validatePostCheckIn = joi_1.default.object({
    code: joi_1.default.string().required(),
});
exports.validateFilterAttendancesStats = joi_1.default.object({
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().required(),
});
