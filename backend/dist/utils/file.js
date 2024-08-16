"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRemoveSync = exports.publicExistSync = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const publicExistSync = (url) => {
    return (0, fs_1.existsSync)(path_1.default.join(process.cwd(), "public/", url));
};
exports.publicExistSync = publicExistSync;
const publicRemoveSync = (url) => {
    return (0, fs_1.unlinkSync)(path_1.default.join(process.cwd(), "public/", url));
};
exports.publicRemoveSync = publicRemoveSync;
