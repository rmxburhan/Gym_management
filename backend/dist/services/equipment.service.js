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
exports.getLogs = exports.getLog = exports.addLog = exports.deleteEquipment = exports.updateEquipment = exports.addEquipment = exports.getEquipment = exports.getEquipments = void 0;
const fs_1 = require("fs");
const equipment_model_1 = __importDefault(require("../models/equipment.model"));
const path_1 = __importDefault(require("path"));
const equipment_log_model_1 = __importDefault(require("../models/equipment.log.model"));
const getEquipments = () => __awaiter(void 0, void 0, void 0, function* () { return yield equipment_model_1.default.find().sort({ createdAt: -1 }); });
exports.getEquipments = getEquipments;
const getEquipment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield equipment_model_1.default.findById(id)
        .sort({ createdAt: -1 })
        .populate({
        path: "log",
        options: { sort: { createdAt: -1 } },
        populate: [{ path: "admin", select: "name profile" }],
    });
});
exports.getEquipment = getEquipment;
const addEquipment = (name, qty, image) => __awaiter(void 0, void 0, void 0, function* () {
    const equipment = new equipment_model_1.default({
        name,
        qty,
        image: image === null || image === void 0 ? void 0 : image.path.split("public/")[1],
    });
    return yield equipment.save();
});
exports.addEquipment = addEquipment;
const updateEquipment = (id, name, qty, image) => __awaiter(void 0, void 0, void 0, function* () {
    const equipment = yield equipment_model_1.default.findById(id);
    if (!equipment) {
        const error = new Error("Equipment not found");
        error.name = "NotFound";
        throw error;
    }
    if (name)
        equipment.name = name;
    if (qty)
        equipment.qty = qty;
    if (image)
        equipment.image = image.path.split("public/")[1];
    return equipment.save();
});
exports.updateEquipment = updateEquipment;
const deleteEquipment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const equipment = yield equipment_model_1.default.findById(id);
    if (!equipment) {
        const error = new Error("Equipment not found");
        error.name = "NotFound";
        throw error;
    }
    if (equipment.image) {
        (0, fs_1.existsSync)(path_1.default.join(process.cwd(), equipment.image || ""))
            ? (0, fs_1.unlinkSync)(path_1.default.join(process.cwd(), equipment.image))
            : undefined;
    }
    yield equipment_log_model_1.default.deleteMany({ equipment: equipment.id });
    return yield equipment_model_1.default.findByIdAndDelete(equipment.id);
});
exports.deleteEquipment = deleteEquipment;
const addLog = (id, adminId, category, description) => __awaiter(void 0, void 0, void 0, function* () {
    const equipment = yield equipment_model_1.default.findById(id);
    if (!equipment) {
        const error = new Error("Add log failed. Id not found");
        error.name = "NotFound";
        throw error;
    }
    return yield equipment_log_model_1.default.create({
        category,
        description,
        admin: adminId,
        equipment: id,
    });
});
exports.addLog = addLog;
const getLog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield equipment_log_model_1.default.findById(id)
        .populate({ path: "admin", select: "name profile" })
        .populate("equipment", "name image");
});
exports.getLog = getLog;
const getLogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (query === null || query === void 0 ? void 0 : query.equipmentId)
        filter.equipment = query.equipmentId;
    return yield equipment_log_model_1.default.find(filter)
        .sort({ createdAt: -1 })
        .populate({ path: "admin", select: "name profile" })
        .populate("equipment", "name image");
});
exports.getLogs = getLogs;
exports.default = {
    getEquipments: exports.getEquipments,
    getEquipment: exports.getEquipment,
    addEquipment: exports.addEquipment,
    updateEquipment: exports.updateEquipment,
    deleteEquipment: exports.deleteEquipment,
    addLog: exports.addLog,
    getLog: exports.getLog,
    getLogs: exports.getLogs,
};
