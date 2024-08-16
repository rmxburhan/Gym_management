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
const node_cron_1 = __importDefault(require("node-cron"));
const attendancecode_model_1 = __importDefault(require("../models/attendancecode.model"));
const date_fns_1 = require("date-fns");
const insertCodeAttendance = () => __awaiter(void 0, void 0, void 0, function* () {
    const code = yield attendancecode_model_1.default.findOne({
        expiresIn: { $gte: new Date() },
    });
    if (!code) {
        const newCode = new attendancecode_model_1.default({
            code: generateRandomCode(),
            createdIn: new Date(),
            expiresIn: (0, date_fns_1.addDays)(new Date().setHours(0, 0, 0, 0), 1),
        });
        yield newCode.save();
    }
});
const generateRandomCode = () => {
    const raw = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    const charactersLength = raw.length;
    for (let i = 0; i < 6; i++) {
        result += raw.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.default = () => {
    insertCodeAttendance();
    node_cron_1.default.schedule("0 0 * * *", () => {
        console.log("running cron job : insert code attendance");
        insertCodeAttendance();
    });
};
