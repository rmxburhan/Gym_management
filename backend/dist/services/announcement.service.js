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
exports.deleteAnnouncement = exports.updateAnnouncement = exports.postAnnouncement = exports.getAnnouncement = exports.getAnnouncements = void 0;
const node_fs_1 = require("node:fs");
const announcements_model_1 = __importDefault(require("../models/announcements.model"));
const node_path_1 = __importDefault(require("node:path"));
const date_fns_1 = require("date-fns");
const getAnnouncements = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filterDate = {};
    const filter = {};
    if (query.startDate) {
        filterDate.$gte = (0, date_fns_1.startOfDay)(query.startDate).toDateString();
        filter.createdAt = filterDate;
    }
    if (query.endDate) {
        filterDate.$lte = (0, date_fns_1.startOfDay)(query.endDate).toDateString();
        filter.createdAt = filterDate;
    }
    return yield announcements_model_1.default.find(filter).sort({ createdAt: -1 });
});
exports.getAnnouncements = getAnnouncements;
const getAnnouncement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield announcements_model_1.default.findById(id);
});
exports.getAnnouncement = getAnnouncement;
const postAnnouncement = (title, content, images) => __awaiter(void 0, void 0, void 0, function* () {
    const newAnnouncement = new announcements_model_1.default({
        title,
        content,
    });
    if (images) {
        newAnnouncement.attachments = images.map((x) => x.path.split("/public")[1]);
    }
    return yield newAnnouncement.save();
});
exports.postAnnouncement = postAnnouncement;
const updateAnnouncement = (id, title, content, files) => __awaiter(void 0, void 0, void 0, function* () {
    const announcement = yield announcements_model_1.default.findById(id);
    if (!announcement) {
        const error = new Error("Update announcement failed. Id not found");
        error.name = "NotFound";
        throw error;
    }
    if (title)
        announcement.title = title;
    if (content)
        announcement.content = content;
    if (files) {
        if (announcement.attachments.length > 0) {
            for (const filePath of announcement.attachments) {
                const fullPath = node_path_1.default.join(process.cwd(), filePath);
                if ((0, node_fs_1.existsSync)(fullPath))
                    (0, node_fs_1.unlinkSync)(fullPath);
            }
        }
        const filesPath = files.map((x) => x.path.split("/public")[1]);
        announcement.attachments = filesPath;
    }
    return yield announcement.save();
});
exports.updateAnnouncement = updateAnnouncement;
const deleteAnnouncement = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield announcements_model_1.default.findByIdAndDelete(id); });
exports.deleteAnnouncement = deleteAnnouncement;
exports.default = {
    getAnnouncements: exports.getAnnouncements,
    getAnnouncement: exports.getAnnouncement,
    postAnnouncement: exports.postAnnouncement,
    updateAnnouncement: exports.updateAnnouncement,
    deleteAnnouncement: exports.deleteAnnouncement,
};
