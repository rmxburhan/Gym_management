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
exports.updateLogo = exports.updateSettings = exports.getSettings = void 0;
const settings_model_1 = __importDefault(require("../models/settings.model"));
const getSettings = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield settings_model_1.default.findOne();
});
exports.getSettings = getSettings;
const updateSettings = (app_name, lat, lng, timezone) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (app_name)
        query.app_name = app_name;
    if (lat)
        query.lat = lat;
    if (lng)
        query.lng = lng;
    if (timezone)
        query.timezone = timezone;
    return yield settings_model_1.default.findOneAndUpdate({}, query, { new: true });
});
exports.updateSettings = updateSettings;
const updateLogo = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const path = file.path.split("/public")[1];
    return yield settings_model_1.default.findOneAndUpdate({}, { image: path }, { new: true });
});
exports.updateLogo = updateLogo;
exports.default = {
    getSettings: exports.getSettings,
    updateSettings: exports.updateSettings,
    updateLogo: exports.updateLogo,
};
