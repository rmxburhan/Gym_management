"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainerSchema = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
exports.trainerSchema = new mongoose_1.Schema({
    identificationNumber: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: [user_model_1.addressSchema],
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    bank: {
        type: String,
        required: true,
    },
    bankNumber: {
        type: Number,
        required: true,
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
