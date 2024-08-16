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
const user_validator_1 = require("../validator/user.validator");
const user_service_1 = __importDefault(require("../services/user.service"));
const authorization_middleware_1 = __importDefault(require("../middleware/authorization.middleware"));
const upload_1 = require("../utils/upload");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = require("node:fs");
const memberactive_middleware_1 = __importDefault(require("../middleware/memberactive.middleware"));
const route = (0, express_1.Router)();
route.get("/", (0, authorization_middleware_1.default)(["admin", "member", "trainer", "staff"]), (req, res, next) => {
    try {
        const user = req.user;
        return res.status(200).json({
            message: "User data succes retrieved.",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
route.post("/profile", (0, authorization_middleware_1.default)(["admin", "member", "trainer", "staff"]), (0, upload_1.uploadSingle)("profile"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const profile = req.file;
        if (!profile) {
            const error = new Error("profile picture doesn't exist");
            error.name = "BadRequest";
            throw error;
        }
        user.profile = profile.path;
        yield user.save();
        return res.status(200).json({
            message: "profile picture has been updated",
        });
    }
    catch (error) {
        if (req.file) {
            const pathToFile = node_path_1.default.join(process.cwd(), req.file.path);
            if ((0, node_fs_1.existsSync)(pathToFile)) {
                (0, node_fs_1.unlinkSync)(pathToFile);
            }
        }
        next(error);
    }
}));
// for updating user information
// route.patch()
route.put("/detail", (0, authorization_middleware_1.default)(["member"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user.memberDetail) {
            const error = new Error("Request cannot be proceed");
            error.name = "BadRequest";
            throw error;
        }
        const { error, value } = user_validator_1.validateInputFillData.validate(req.body);
        if (error)
            throw error;
        const { gender, addresses, phoneNumber, birthDate } = value;
        const data = user_service_1.default.fillData(user.id, gender, addresses, phoneNumber, new Date(birthDate));
        return res.status(200).json({
            message: "Personal information has been filled",
        });
    }
    catch (error) {
        next(error);
    }
}));
route.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = user_validator_1.validateRegisterInput.validate(req.body);
        if (error)
            throw error;
        const { name, email, password, } = value;
        const userData = user_service_1.default.createUser({
            name,
            email,
            password,
            role: "member",
        });
        const user = yield user_service_1.default.postRegister(userData);
        return res.status(201).json({
            message: "Register success",
        });
    }
    catch (error) {
        next(error);
    }
}));
route.get("/myclass", (0, authorization_middleware_1.default)(["member"]), memberactive_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const data = yield user_service_1.default.classData(user.id);
        return res.status(200).json({
            message: "Class success retrieved",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = route;
