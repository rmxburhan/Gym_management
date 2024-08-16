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
const announcement_service_1 = __importDefault(require("../services/announcement.service"));
const upload_1 = require("../utils/upload");
const announcement_validator_1 = require("../validator/announcement.validator");
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const router = (0, express_1.Router)();
router.get("/", (0, authorization_middleware_1.default)(["admin", "member", "trainer"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        const datas = yield announcement_service_1.default.getAnnouncements({
            startDate,
            endDate,
        });
        return res.status(200).json({
            message: "Announcements success retrieved",
            data: datas,
        });
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (0, authorization_middleware_1.default)(["admin"]), (0, upload_1.uploadMultiple)("images"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = announcement_validator_1.validateInputPostAnnouncement.validate(req.body);
        if (error)
            throw error;
        const { title, content } = value;
        let files = undefined;
        if (req.files) {
            if (Array.isArray(files)) {
                files = req.files;
            }
            else {
                files = req.files.images;
            }
        }
        const data = yield announcement_service_1.default.postAnnouncement(title, content, files);
        return res.status(201).json({
            message: "Announcement created.",
            data,
        });
    }
    catch (error) {
        if (req.files) {
            if (Array.isArray(req.files)) {
                for (const file of req.files) {
                    const filePath = node_path_1.default.join(process.cwd(), file.path.split("/public")[1]);
                    (0, node_fs_1.existsSync)(filePath) ? (0, node_fs_1.unlinkSync)(filePath) : undefined;
                }
            }
            else {
                const files = req.files.images;
                for (const file of files) {
                    const filePath = node_path_1.default.join(process.cwd(), file.path.split("/public")[1]);
                    (0, node_fs_1.existsSync)(filePath) ? (0, node_fs_1.unlinkSync)(filePath) : undefined;
                }
            }
        }
        next(error);
    }
}));
router.get("/:id", (0, authorization_middleware_1.default)(["admin", "member", "trainer"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield announcement_service_1.default.getAnnouncement(id);
        return res.status(200).json({
            message: "Announcement retrieved",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}));
router.post("/:id", (0, authorization_middleware_1.default)(["admin"]), (0, upload_1.uploadMultiple)("images"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { error, value } = announcement_validator_1.validateInputUpdateAnnouncement.validate(req.body);
        if (error)
            throw error;
        const { title, content } = value;
        let files = undefined;
        if (req.files) {
            if (Array.isArray(files)) {
                files = req.files;
            }
            else {
                files = req.files.images;
            }
        }
        const data = yield announcement_service_1.default.updateAnnouncement(id, title, content, files);
        return res.status(200).json({
            message: "Update annuoncement success",
            data,
        });
    }
    catch (error) {
        if (req.files) {
            if (Array.isArray(req.files)) {
                for (const file of req.files) {
                    const filePath = node_path_1.default.join(process.cwd(), file.path.split("/public")[1]);
                    (0, node_fs_1.existsSync)(filePath) ? (0, node_fs_1.unlinkSync)(filePath) : undefined;
                }
            }
            else {
                const files = req.files.images;
                for (const file of files) {
                    const filePath = node_path_1.default.join(process.cwd(), file.path.split("/public")[1]);
                    (0, node_fs_1.existsSync)(filePath) ? (0, node_fs_1.unlinkSync)(filePath) : undefined;
                }
            }
        }
        next(error);
    }
}));
router.delete("/:id", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield announcement_service_1.default.deleteAnnouncement(id);
        if (!deleted) {
            throw new Error("Delete announcement failed.");
        }
        return res.status(204).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
