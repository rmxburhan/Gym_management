"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res) => {
    res.status(404).json({
        code: 404,
        status: "Not Found",
        message: `Not found`,
    });
};
