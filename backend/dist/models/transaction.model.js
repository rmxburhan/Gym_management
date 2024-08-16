"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    member: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    membership: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Membership",
    },
    clientSecret: {
        type: String,
        required: true,
    },
    totalPayment: {
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    paymentExpire: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.clientSecret;
            delete ret.__v;
        },
    },
});
const Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
exports.default = Transaction;
