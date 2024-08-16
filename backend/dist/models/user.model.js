"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressSchema = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const member_model_1 = require("./member.model");
const staff_model_1 = require("./staff.model");
const trainer_model_1 = require("./trainer.model");
exports.addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        requried: true,
    },
    zip: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            ret._id = undefined;
            ret.__v = undefined;
        },
    },
});
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["member", "admin", "trainer", "staff"],
        default: "member",
    },
    memberDetail: {
        type: member_model_1.memberSchema,
        required: false,
    },
    trainerDetail: {
        type: trainer_model_1.trainerSchema,
        required: false,
    },
    staffDetail: {
        type: staff_model_1.staffSchema,
        required: false,
    },
    profile: {
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
        transform: (doc, ret) => {
            ret.id = ret._id;
            ret._id = undefined;
            ret.__v = undefined;
            ret.password = undefined;
        },
        versionKey: false,
        virtuals: true,
    },
});
userSchema.pre("save", function (next) {
    if (this.isModified("password") || this.isNew) {
        bcryptjs_1.default.genSalt(10, (err, salt) => {
            if (err)
                return next(err);
            bcryptjs_1.default.hash(this.password, salt, (err, hash) => {
                if (err)
                    return next(err);
                this.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});
userSchema.methods.comparePassword = function (candidatePassword) {
    try {
        return bcryptjs_1.default.compareSync(candidatePassword, this.password);
    }
    catch (error) {
        throw error;
    }
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
