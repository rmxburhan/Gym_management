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
const class_service_1 = __importDefault(require("../services/class.service"));
const class_validator_1 = require("../validator/class.validator");
const memberactive_middleware_1 = __importDefault(require("../middleware/memberactive.middleware"));
const route = (0, express_1.Router)();
route.get("/", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { trainerId } = req.query;
        const classes = yield class_service_1.default.getClasses(trainerId);
        return res.status(200).json({
            message: "Class success retrieved.",
            data: classes,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.post("/", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = class_validator_1.validateInputCreateClass.validate(req.body);
        if (input.error) {
            throw input.error;
        }
        const { name, description, trainer, date, maxParticipant } = req.body;
        const classData = yield class_service_1.default.addClass(name, description, trainer, new Date(date), maxParticipant);
        if (!classData) {
            throw new Error("Add class failed.");
        }
        return res.status(201).json({
            message: "Add class success.",
        });
    }
    catch (error) {
        next(error);
    }
}));
route.get("/upcoming", (0, authorization_middleware_1.default)(["member", "admin"]), memberactive_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classes = yield class_service_1.default.getUpcomingClasses();
        return res.status(200).json({
            message: "Class data success retrieved",
            data: classes,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.get("/:id", (0, authorization_middleware_1.default)(["admin", "trainer", "member"]), memberactive_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const classdata = yield class_service_1.default.getClass(id);
        if (!classdata) {
            const error = new Error("Get class failed. Id not found");
            error.name = "NotFound";
            throw error;
        }
        return res.status(200).json({
            message: "Get class success",
            data: classdata,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.post("/:id/register", (0, authorization_middleware_1.default)(["member"]), memberactive_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        yield class_service_1.default.registerClass(id, user.id);
        return res.status(200).json({
            message: "You are now participated in the class",
        });
    }
    catch (error) {
        next(error);
    }
}));
route.post("/:id/cancel", (0, authorization_middleware_1.default)(["member"]), memberactive_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        const success = yield class_service_1.default.unregisterClass(id, user.id);
        if (!success) {
            const error = new Error("Operation failed");
            error.name = "BadRequest";
            throw error;
        }
        return res.status(200).json({
            message: "Cancel class succeed",
        });
    }
    catch (error) {
        next(error);
    }
}));
route.put("/:id", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const input = class_validator_1.validateInputUpdateClass.validate(req.body);
        if (input.error) {
            throw input.error;
        }
        const { name, description, trainer, date, maxParticipant } = input.value;
        yield class_service_1.default.updateClass(id, name, description, trainer, date, maxParticipant);
        return res.status(200).json({
            message: "Class has been updated",
        });
    }
    catch (error) {
        next(error);
    }
}));
route.delete("/:id", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield class_service_1.default.deleteClass(id);
        return res.status(204).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.default = route;
