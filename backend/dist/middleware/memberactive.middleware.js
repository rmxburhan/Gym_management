"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandlers_middleware_1 = __importDefault(require("./errorhandlers.middleware"));
const authorizememberactive = (req, res, next) => {
    try {
        const user = req.user;
        if (user.role === "member") {
            if (!user.memberDetail) {
                return res.status(422).json({
                    message: "Please fill your personal information first",
                    type: "memberdetail",
                });
            }
            else if (!user.memberDetail.membership) {
                return res.status(422).json({
                    message: "You are not have membership registered",
                    type: "membership_not_found",
                });
            }
            else if (user.memberDetail.membership.status == false) {
                return res.status(200).json({
                    message: "Your membership has expired",
                    type: "membership_expired",
                });
            }
        }
        next();
    }
    catch (error) {
        (0, errorhandlers_middleware_1.default)(error, req, res, next);
    }
};
exports.default = authorizememberactive;
