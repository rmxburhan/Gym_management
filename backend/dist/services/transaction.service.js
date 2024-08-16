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
exports.acceptPayment = exports.getTransactionHistory = exports.getTransaction = exports.getTransactions = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const membership_model_1 = __importDefault(require("../models/membership.model"));
const getTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield transaction_model_1.default.find()
        .sort({ createdAt: -1 })
        .populate("membership", "name duration")
        .populate("member", "name profile");
});
exports.getTransactions = getTransactions;
const getTransaction = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: id };
    if (user.role === "member")
        filter.member = user.id;
    return yield transaction_model_1.default.findOne(filter);
});
exports.getTransaction = getTransaction;
const getTransactionHistory = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield transaction_model_1.default.find({ member: memberId }).sort({ createdAt: -1 });
});
exports.getTransactionHistory = getTransactionHistory;
const acceptPayment = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_model_1.default.findById(transactionId);
    if (!transaction) {
        const error = new Error("Operation fialed. Id not found");
        error.name = "NotFound";
        throw error;
    }
    if (transaction.status !== "pending" ||
        transaction.paymentExpire < new Date()) {
        const error = new Error("Operation failed. transaction is not valid");
        error.name = "BadRequest";
        throw error;
    }
    transaction.status = "success";
    yield transaction.save();
    const membership = yield membership_model_1.default.findById(transaction.membership);
    return yield user_model_1.default.findByIdAndUpdate(transaction.member, {
        $set: {
            "memberDetail.membership": {
                membership: membership.id,
                registerDate: (0, dayjs_1.default)(),
                expiresDate: (0, dayjs_1.default)().add(membership.duration, "day"),
            },
        },
    });
});
exports.acceptPayment = acceptPayment;
exports.default = {
    getTransaction: exports.getTransaction,
    getTransactions: exports.getTransactions,
    getTransactionHistory: exports.getTransactionHistory,
    acceptPayment: exports.acceptPayment,
};
