"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (time) => {
    const [hour, minute, second] = time.split(":").map(Number);
    return hour * 3600 + minute * 60 + second;
};
