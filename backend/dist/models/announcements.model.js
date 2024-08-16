"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.announcementSchema = void 0;
const mongoose_1 = require("mongoose");
exports.announcementSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    attachments: {
        type: [String],
        required: false,
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            ret._id = undefined;
            ret.__v = undefined;
        },
        virtuals: true,
    },
});
const Announcement = (0, mongoose_1.model)("Announcement", exports.announcementSchema);
exports.default = Announcement;
