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
const upload_1 = require("../utils/upload");
const equipment_service_1 = __importDefault(require("../services/equipment.service"));
const equipment_validator_1 = require("../validator/equipment.validator");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const route = (0, express_1.Router)();
route.get("/", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipments = yield equipment_service_1.default.getEquipments();
        return res.status(200).json({
            message: "Equipment success retrieved",
            data: equipments,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.post("/", (0, authorization_middleware_1.default)(["admin"]), (0, upload_1.uploadSingle)("image"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = equipment_validator_1.validateInputAddEquipment.validate(req.body);
        if (input.error)
            throw input.error;
        const { name, qty } = input.value;
        const equipment = yield equipment_service_1.default.addEquipment(name, qty, req.file);
        if (!equipment) {
            throw new Error("Create equipment failed.");
        }
        return res.status(201).json({
            message: "Add equipment success.",
        });
    }
    catch (error) {
        if (req.file) {
            const pathToFile = path_1.default.join(process.cwd(), req.file.path);
            (0, fs_1.existsSync)(pathToFile) ? (0, fs_1.unlinkSync)(pathToFile) : undefined;
        }
        next(error);
    }
}));
route.get("/logs", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { equipmentId } = req.query;
        const logs = yield equipment_service_1.default.getLogs({ equipmentId });
        return res.status(200).json({
            message: "Logs data success retrieved",
            data: logs,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.get("/:id", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const equipment = yield equipment_service_1.default.getEquipment(id);
        if (!equipment) {
            const error = new Error("Get equipment failed. Id not found");
            error.name = "NotFound";
            throw error;
        }
        return res.status(200).json({
            message: "Equipment success retrieved",
            data: equipment,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.post("/:id", (0, authorization_middleware_1.default)(["admin"]), (0, upload_1.uploadSingle)("image"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const input = equipment_validator_1.validateInputUpdateEquipment.validate(req.body);
        if (input.error) {
            throw input.error;
        }
        const { name, qty } = input.value;
        const equipment = yield equipment_service_1.default.updateEquipment(id, name, qty, req.file);
        if (!equipment) {
            throw new Error("Update equipment failed");
        }
        return res.status(200).json({
            message: "Update equipment success",
        });
    }
    catch (error) {
        if (req.file) {
            const pathToFile = path_1.default.join(process.cwd(), req.file.path);
            (0, fs_1.existsSync)(pathToFile) ? (0, fs_1.unlinkSync)(pathToFile) : undefined;
        }
        next(error);
    }
}));
route.delete("/:id", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const trainer = yield equipment_service_1.default.deleteEquipment(id);
        if (!trainer) {
            throw new Error("Failed to remove equipment data");
        }
        return res.status(204).end();
    }
    catch (error) {
        next(error);
    }
}));
route.post("/:id/logs", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        const input = equipment_validator_1.validateInputAddEquipmentLog.validate(req.body);
        if (input.error) {
            throw input.error;
        }
        const { description, category } = input.value;
        const log = yield equipment_service_1.default.addLog(id, user.id, category, description);
        if (!log) {
            throw new Error("Failed to add log");
        }
        return res.status(201).json({
            message: "log has been added",
            data: log,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = route;
