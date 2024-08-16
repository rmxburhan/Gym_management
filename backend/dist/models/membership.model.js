"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const membershipSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        default: 30,
    },
    price: {
        type: Number,
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
        default: false,
    },
    discountPrice: {
        type: Number,
        required: false,
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
            delete ret.__v;
        },
    },
});
const Membership = (0, mongoose_1.model)("Membership", membershipSchema);
exports.default = Membership;
