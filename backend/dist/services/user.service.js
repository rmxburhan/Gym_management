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
exports.classData = exports.fillData = exports.getUser = exports.createUser = exports.postRegister = void 0;
const class_model_1 = __importDefault(require("../models/class.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const postRegister = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExist = yield user_model_1.default.findOne({ email: user.email });
    if (emailExist) {
        const error = new Error();
        error.name = "Email already taken. please use another email";
        throw error;
    }
    yield user.save();
});
exports.postRegister = postRegister;
const createUser = ({ email, password, name, role, }) => new user_model_1.default({ name, email, password, role });
exports.createUser = createUser;
const getUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    query.deletedAt = undefined;
    return yield user_model_1.default.findOne(query);
});
exports.getUser = getUser;
const fillData = (userId, gender, addresses, phoneNumber, birthDate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findByIdAndUpdate(userId, {
        memberDetail: {
            address: addresses,
            phoneNumber,
            gender,
            birthDate,
        },
    });
});
exports.fillData = fillData;
const classData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield class_model_1.default.find({ member: id }).sort({ createdAt: -1 });
});
exports.classData = classData;
exports.default = {
    postRegister: exports.postRegister,
    createUser: exports.createUser,
    getUser: exports.getUser,
    classData: exports.classData,
    fillData: exports.fillData,
};
