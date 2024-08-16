"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipmentLogSchema = void 0;
const mongoose_1 = require("mongoose");
exports.equipmentLogSchema = new mongoose_1.Schema({
    equipment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Equipment",
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["maintenance", "return", "sell", "buy"],
    },
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
const EquipmentLog = (0, mongoose_1.model)("EquipmentLog", exports.equipmentLogSchema);
exports.default = EquipmentLog;
