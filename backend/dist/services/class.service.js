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
exports.unregisterClass = exports.registerClass = exports.getUpcomingClasses = exports.getClasses = exports.getClass = exports.deleteClass = exports.updateClass = exports.addClass = void 0;
const mongoose_1 = require("mongoose");
const class_model_1 = __importDefault(require("../models/class.model"));
const dayjs_1 = __importDefault(require("dayjs"));
const addClass = (name, description, trainer, date, maxParticipant) => __awaiter(void 0, void 0, void 0, function* () {
    return yield class_model_1.default.create({
        name,
        description,
        trainer,
        date,
        maxParticipant,
    });
});
exports.addClass = addClass;
const updateClass = (id, name, description, trainer, date, maxParticipant) => __awaiter(void 0, void 0, void 0, function* () {
    const classData = yield class_model_1.default.findOne({ _id: id, deletedAt: undefined });
    if (!classData) {
        const error = new Error("Class not found");
        error.name = "NotFound";
        throw error;
    }
    if (name)
        classData.name = name;
    if (description)
        classData.description = description;
    if (trainer)
        classData.trainer = new mongoose_1.Types.ObjectId(trainer);
    if (date)
        classData.date = new Date(date);
    if (maxParticipant)
        classData.maxParticipant = maxParticipant;
    return yield classData.save();
});
exports.updateClass = updateClass;
const deleteClass = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const classData = yield class_model_1.default.findOne({ _id: id, deletedAt: undefined });
    if (!classData) {
        const error = new Error("Delete class failed. Id not found");
        error.name = "NotFound";
        throw error;
    }
    classData.deletedAt = (0, dayjs_1.default)().toDate();
    return yield classData.save();
});
exports.deleteClass = deleteClass;
const getClass = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield class_model_1.default.findOne({ _id: id, deletedAt: undefined }).populate([
        { path: "trainer", select: "name profile" },
        { path: "participants", select: "name profile" },
    ]);
});
exports.getClass = getClass;
const getClasses = (trainer) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        deletedAt: undefined,
    };
    if (trainer)
        filter.trainer = trainer;
    return yield class_model_1.default.find(filter).populate({
        path: "trainer",
        select: "name profile id",
    });
});
exports.getClasses = getClasses;
const getUpcomingClasses = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield class_model_1.default.find({
        deletedAt: undefined,
        date: { $gte: (0, dayjs_1.default)().toDate() },
    })
        .select("name description date trainer")
        .sort({
        date: 1,
    })
        .populate({
        path: "trainer",
        select: "name profile id",
    });
});
exports.getUpcomingClasses = getUpcomingClasses;
const registerClass = (id, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const classData = yield class_model_1.default.findOne({ _id: id, deletedAt: undefined });
    if (!classData) {
        const error = new Error("Class not found");
        error.name = "NotFound";
        throw error;
    }
    if (classData.participants.includes(new mongoose_1.Types.ObjectId(memberId))) {
        const error = new Error("You already registered");
        error.name = "BadRequest";
        throw error;
    }
    if (new Date(classData.date) < new Date()) {
        const error = new Error("You cannot register this class");
        error.name = "BadRequest";
        throw error;
    }
    if (classData.maxParticipant <= classData.participants.length) {
        const error = new Error("You cannot participate in this class. full");
        error.name = "BadRequest";
        throw error;
    }
    classData.participants.push(new mongoose_1.Types.ObjectId(memberId));
    return yield classData.save();
});
exports.registerClass = registerClass;
const unregisterClass = (classId, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const classData = yield class_model_1.default.findOne({ _id: classId, deletedAt: undefined });
    if (!classData) {
        const error = new Error("Cancel class failed. id not found");
        error.name = "NotFound";
        throw error;
    }
    if (!classData.participants.includes(new mongoose_1.Types.ObjectId(memberId))) {
        const error = new Error("You are not participating in the class");
        error.name = "BadRequest";
        throw error;
    }
    return yield class_model_1.default.findByIdAndUpdate(classData.id, {
        $pull: { participant: new mongoose_1.Types.ObjectId(memberId) },
    });
});
exports.unregisterClass = unregisterClass;
exports.default = {
    addClass: exports.addClass,
    updateClass: exports.updateClass,
    deleteClass: exports.deleteClass,
    getClass: exports.getClass,
    getClasses: exports.getClasses,
    getUpcomingClasses: exports.getUpcomingClasses,
    registerClass: exports.registerClass,
    unregisterClass: exports.unregisterClass,
};
