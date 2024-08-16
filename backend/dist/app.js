"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import chalk  from "chalk'
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const code_1 = __importDefault(require("./cron_job/code"));
const db_1 = __importDefault(require("./persistence/db"));
const index_1 = __importDefault(require("./startup/index"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, index_1.default)(app);
(0, db_1.default)();
(0, code_1.default)();
(0, routes_1.default)(app);
exports.default = app;
