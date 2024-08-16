"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = (error, req, res, next) => {
    if (error) {
        let code = 0;
        let message = error.message;
        if (joi_1.default.isError(error)) {
            code = 400;
        }
        else if (error.name === "NotFound") {
            code = 404;
        }
        else if (error.name === "BadRequest") {
            code = 402;
        }
        else if (error.name === "Unauthorize") {
            code = 401;
        }
        else if (error.name === "Forbidden") {
            code = 403;
        }
        else {
            code = 500;
        }
        return res.status(code).json({
            errors: message,
        });
    }
};
