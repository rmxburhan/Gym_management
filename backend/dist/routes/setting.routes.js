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
const settings_service_1 = __importDefault(require("../services/settings.service"));
const setting_validator_1 = require("../validator/setting.validator");
const upload_1 = require("../utils/upload");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get("/", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datas = yield settings_service_1.default.getSettings();
        return res.status(200).json({
            message: "Get setting success",
            data: datas,
        });
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = setting_validator_1.validateInputPatchSettings.validate(req.body);
        if (error)
            throw error;
        const { app_name, lat, lng, timezone } = value.update;
        const data = yield settings_service_1.default.updateSettings(app_name, lat, lng, timezone);
        return res.status(200).json({
            message: "Setting updated",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}));
router.post("/image", (0, authorization_middleware_1.default)(["admin"]), (0, upload_1.uploadSingle)("image"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            const error = new Error("Image is required");
            error.name = "BadRequest";
            throw error;
        }
        const data = yield settings_service_1.default.updateLogo(req.file);
        return res.status(200).json({
            message: "Update logo success",
            data,
        });
    }
    catch (error) {
        if (req.file) {
            const filepath = path_1.default.join(process.cwd(), req.file.path.split("/public")[0]);
            (0, fs_1.existsSync)(filepath) ? (0, fs_1.unlinkSync)(filepath) : undefined;
        }
        next(error);
    }
}));
exports.default = router;
