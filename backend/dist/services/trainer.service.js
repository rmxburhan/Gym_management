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
exports.getTrainer = exports.updateTrainer = exports.addTrainer = exports.deleteTrainer = exports.getTrainers = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const file_1 = require("../utils/file");
const getTrainers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.find({ role: "trainer", deletedAt: undefined }).sort({
        createdAt: -1,
    });
});
exports.getTrainers = getTrainers;
const deleteTrainer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({
        _id: id,
        deletedAt: undefined,
        role: "trainer",
    });
    if (!user) {
        const error = new Error("Delete trainer failed. Id not found");
        error.name = "NotFound";
        throw error;
    }
    if (user.profile && (0, file_1.publicExistSync)(user.profile)) {
        (0, file_1.publicRemoveSync)(user.profile);
    }
    user.deletedAt = (0, dayjs_1.default)().toDate();
    return yield user.save();
});
exports.deleteTrainer = deleteTrainer;
const addTrainer = (name, email, password, addresses, bank, bankNumber, identificationNumber, phoneNumber, gender, profile) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield user_model_1.default.findOne({ email, role: "trainer" });
    if (exist) {
        const error = new Error("Email already taken. use another email");
        throw error;
    }
    const trainer = new user_model_1.default({
        name,
        email,
        password,
        role: "trainer",
        trainerDetail: {
            bank,
            bankNumber,
            address: addresses,
            identificationNumber,
            phoneNumber,
            gender,
        },
    });
    if (profile) {
        trainer.profile = profile.path.split("public/")[1];
    }
    return yield trainer.save();
});
exports.addTrainer = addTrainer;
const updateTrainer = (id, name, email, password, addresses, bank, bankNumber, phoneNumber, identificationNumber, gender, profile) => __awaiter(void 0, void 0, void 0, function* () {
    let trainer = yield user_model_1.default.findOne({ role: "trainer", _id: id });
    if (!trainer) {
        const error = new Error("Update trainer failed. Id not found");
        error.name = "NotFound";
        throw error;
    }
    if (name)
        trainer.name = name;
    if (email)
        trainer.email = email;
    if (password)
        trainer.password = password;
    if (addresses)
        trainer.trainerDetail.address = addresses;
    if (bank)
        trainer.trainerDetail.bank = bank;
    if (bankNumber)
        trainer.trainerDetail.bankNumber = bankNumber;
    if (phoneNumber)
        trainer.trainerDetail.phoneNumber = phoneNumber;
    if (identificationNumber)
        trainer.trainerDetail.identificationNumber = identificationNumber;
    if (profile)
        trainer.profile = profile.path.split("public/")[1];
    if (gender)
        trainer.trainerDetail.gender = gender;
    return yield trainer.save();
});
exports.updateTrainer = updateTrainer;
const getTrainer = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.default.findOne({ _id: id, role: "trainer", deletedAt: undefined }); });
exports.getTrainer = getTrainer;
exports.default = {
    getTrainers: exports.getTrainers,
    deleteTrainer: exports.deleteTrainer,
    addTrainer: exports.addTrainer,
    updateTrainer: exports.updateTrainer,
    getTrainer: exports.getTrainer,
};
