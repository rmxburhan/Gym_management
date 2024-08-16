"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
exports.default = (app) => {
    app.use(express_1.default.static("public"));
    app.use((0, cors_1.default)({ credentials: true }));
    app.use(express_1.default.static(path_1.default.join(process.cwd(), "/public")));
    app.use((0, morgan_1.default)("combined"));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
};
