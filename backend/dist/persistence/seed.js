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
const config_1 = __importDefault(require("../config"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const seed_data_1 = require("./data/seed_data");
const settings_model_1 = __importDefault(require("../models/settings.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.mongo_uri);
        console.log("Connected to database");
        yield user_model_1.default.deleteMany({});
        const saltGen = bcryptjs_1.default.genSaltSync(10);
        const hashedUserData = seed_data_1.userData.map((user) => {
            user.password = bcryptjs_1.default.hashSync(user.password, saltGen);
            return user;
        });
        user_model_1.default.insertMany(hashedUserData);
        yield settings_model_1.default.deleteMany({});
        yield settings_model_1.default.create({
            app_name: "Gym management system",
        });
        console.log("Seed database succcess;");
        process.exit();
    }
    catch (error) {
        console.error(error);
    }
});
seed();
