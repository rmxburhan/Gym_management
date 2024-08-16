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
const authorization_middleware_1 = __importDefault(require("../middleware/authorization.middleware"));
const attendance_service_1 = __importDefault(require("../services/attendance.service"));
const attendance_validator_1 = require("../validator/attendance.validator");
const memberactive_middleware_1 = __importDefault(require("../middleware/memberactive.middleware"));
const route = (0, express_1.Router)();
route.get("/", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterQuery = req.query;
        console.log(filterQuery);
        const attendances = yield attendance_service_1.default.getAttendances(filterQuery);
        return res.status(200).json({
            message: "Attendances Data has been retrieved",
            data: attendances,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.get("/stats", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = attendance_validator_1.validateFilterAttendancesStats.validate(req.query);
        if (error)
            throw error;
        const { startDate, endDate } = value;
        const datas = yield attendance_service_1.default.getStats(startDate, endDate);
        return res.status(200).json({
            message: "Stats data ",
            data: datas,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.get("/count", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datas = yield attendance_service_1.default.getCount();
        return res.status(200).json({
            message: "Traffic count success retrieved",
            data: datas,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.get("/code", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = yield attendance_service_1.default.getCode();
        if (!code) {
            const error = new Error("Code not found. you can create manually");
            error.name = "NotFound";
            throw error;
        }
        return res.status(200).json({
            message: "Attendance Code succes retirieved",
            code: code.code,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.post("/checkin", (0, authorization_middleware_1.default)(["member"]), memberactive_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const input = attendance_validator_1.validatePostCheckIn.validate(req.body);
        if (input.error) {
            throw input.error;
        }
        const { code } = input.value;
        const attendance = yield attendance_service_1.default.postCheckIn(user.id, code);
        if (!attendance) {
            throw new Error("Check in failed");
        }
        return res.status(200).json({
            message: "Checkin success",
        });
    }
    catch (error) {
        next(error);
    }
}));
route.post("/checkout", (0, authorization_middleware_1.default)(["member"]), memberactive_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const attendance = yield attendance_service_1.default.postCheckOut(user.id);
        if (!attendance) {
            throw new Error("Checkout failed.");
        }
        return res.status(200).json({
            message: "Checkout success",
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = route;
