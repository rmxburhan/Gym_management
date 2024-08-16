"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_middleware_1 = __importDefault(require("../middleware/authorization.middleware"));
const transaction_service_1 = __importDefault(require("../services/transaction.service"));
const route = (0, express_1.Router)();
route.get("/", (0, authorization_middleware_1.default)(["admin", "member"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const transactions = user.role === "member"
            ? yield transaction_service_1.default.getTransactionHistory(user.id)
            : yield transaction_service_1.default.getTransactions();
        return res.status(200).json({
            message: "Transactions data success retrieved",
            data: transactions,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.get("/:id", (0, authorization_middleware_1.default)(["admin", "member"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { id } = req.params;
        const transaction = yield transaction_service_1.default.getTransaction(id, user);
        if (!transaction) {
            const error = new Error("Transaction not found");
            error.name = "NotFound";
            throw error;
        }
        return res.status(200).json({
            message: "Transaction success retrieved",
            data: transaction,
        });
    }
    catch (error) {
        next(error);
    }
}));
/**
 * This is just for testing use 3rd payment api ASAP bro
 */
route.post("/:id/activate", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transaction = yield transaction_service_1.default.acceptPayment(id);
        return res.status(200).json({
            message: "Payment success saved",
            data: transaction,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = route;
