"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.membershipDataSchema = void 0;
const mongoose_1 = require("mongoose");
exports.membershipDataSchema = new mongoose_1.Schema({
    membership: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Membership",
        required: true,
    },
    registerDate: {
        type: Date,
        required: true,
    },
    expiresDate: {
        type: Date,
        required: true,
    },
}, {
    toObject: { virtuals: true },
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
exports.membershipDataSchema.virtual("status").get(function () {
    return this.expiresDate > new Date();
});
