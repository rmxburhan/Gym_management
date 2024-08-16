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
const member_service_1 = __importDefault(require("../services/member.service"));
const member_validator_1 = require("../validator/member.validator");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const upload_1 = require("../utils/upload");
const route = (0, express_1.Router)();
route.get("/", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, active, gender, } = req.query;
        const members = yield member_service_1.default.getMembers({ name, gender, active });
        return res.status(200).json({
            message: "Members data success retrieved.",
            data: members,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.post("/", (0, authorization_middleware_1.default)(["admin"]), (0, upload_1.uploadSingle)("profile"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var input = member_validator_1.validateInputAddMember.validate(req.body);
        if (input.error) {
            throw input.error;
        }
        const { name, email, password, addresses, birthDate, phoneNumber, gender, } = input.value;
        const member = yield member_service_1.default.addMember(name, password, email, addresses, birthDate, gender, phoneNumber, req.file);
        if (!member) {
            throw new Error("Add member failed");
        }
        return res.status(201).json({
            message: "Member has been added",
            data: member,
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
route.get("/:id", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const member = yield member_service_1.default.getMember(id);
        if (!member) {
            const error = new Error("Get member failed. Id not found");
            error.name = "NotFound";
            throw error;
        }
        return res.status(200).json({
            message: "Member data success retrieved",
            data: member,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.post("/:id", (0, authorization_middleware_1.default)(["admin"]), (0, upload_1.uploadSingle)("profile"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const input = member_validator_1.validateInputUpdateMember.validate(req.body);
        if (input.error) {
            throw input.error;
        }
        const { name, email, password, addresses, birthDate, gender, phoneNumber, } = input.value;
        const member = yield member_service_1.default.updateMember(id, name, password, email, addresses, birthDate, gender, phoneNumber, req.file);
        if (!member) {
            throw new Error("Update member failed");
        }
        return res.status(200).json({
            message: "Update member success",
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
        yield member_service_1.default.deleteMember(id);
        return res.status(204).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.default = route;
