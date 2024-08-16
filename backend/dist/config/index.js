"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017/gym_test";
const stripeKey = process.env.STRIPE_KEY;
const jwtSecret = process.env.JWT_SECRET;
const jwtIssuer = process.env.JWT_ISSUER || "rmxburhan.site";
if (stripeKey === undefined) {
    console.log("Stripe key is not initialized");
    process.exit(0);
}
exports.default = {
    port: port,
    mongo_uri: mongo_uri,
    stripeKey,
    jwtSecret,
    jwtIssuer,
};