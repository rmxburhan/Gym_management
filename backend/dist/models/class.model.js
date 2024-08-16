"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const classSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    trainer: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    maxParticipant: {
        type: Number,
        required: true,
    },
    participants: {
        type: [mongoose_1.Types.ObjectId],
        ref: "User",
        default: [],
    },
    date: {
        type: Date,
        required: true,
    },
    deletedAt: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__vl;
        },
        virtuals: true,
    },
    toObject: { virtuals: true },
});
classSchema.virtual("trainerDetail", {
    ref: "User",
    localField: "trainer",
    foreignField: "_id",
});
const Class = (0, mongoose_1.model)("Class", classSchema);
exports.default = Class;
