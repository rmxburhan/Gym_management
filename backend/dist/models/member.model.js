"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberSchema = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
const membershipdata_model_1 = require("./membershipdata.model");
exports.memberSchema = new mongoose_1.Schema({
    birthDate: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    address: {
        type: [user_model_1.addressSchema],
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    membership: {
        type: membershipdata_model_1.membershipDataSchema,
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
