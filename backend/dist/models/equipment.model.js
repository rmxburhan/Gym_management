"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const equipmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: false,
    },
    deletedAt: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
    toObject: {
        virtuals: true,
    },
});
equipmentSchema.virtual("log", {
    ref: "EquipmentLog",
    localField: "_id",
    foreignField: "equipment",
});
const Equipment = (0, mongoose_1.model)("Equipment", equipmentSchema);
exports.default = Equipment;
