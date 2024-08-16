"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.settingsSchema = new mongoose_1.Schema({
    app_name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: false,
    },
    lat: {
        type: String,
        required: false,
    },
    lng: {
        type: String,
        required: false,
    },
    timezone: {
        type: String,
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
const Settings = (0, mongoose_1.model)("Settings", exports.settingsSchema);
exports.default = Settings;
