"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const attendanceCodeSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: Date,
        required: true,
    },
    createdIn: {
        type: Date,
        required: true,
    },
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
const AttendanceCode = (0, mongoose_1.model)("AttendanceCode", attendanceCodeSchema);
exports.default = AttendanceCode;
