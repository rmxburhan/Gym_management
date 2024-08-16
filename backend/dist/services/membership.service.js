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
exports.registerMembership = exports.deleteMembership = exports.updateMembership = exports.patchPublishStatus = exports.getMembershipById = exports.addMembership = exports.getMemberships = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const membership_model_1 = __importDefault(require("../models/membership.model"));
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const stripe_1 = __importDefault(require("../startup/stripe"));
const getMemberships = (member) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        deletedAt: undefined,
    };
    if (member)
        filter.published = true;
    return yield membership_model_1.default.find(filter).sort({
        createdAt: -1,
    });
});
exports.getMemberships = getMemberships;
const addMembership = (name, description, duration, price, discountPrice) => __awaiter(void 0, void 0, void 0, function* () {
    return membership_model_1.default.create({
        name,
        description,
        duration,
        price,
        discountPrice,
    });
});
exports.addMembership = addMembership;
const getMembershipById = (id, member) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        _id: id,
        deletedAt: undefined,
    };
    if (member)
        filter.published = true;
    return yield membership_model_1.default.findOne(filter);
});
exports.getMembershipById = getMembershipById;
const patchPublishStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const membership = yield membership_model_1.default.findOne({
        _id: id,
        deletedAt: undefined,
    });
    if (!membership) {
        const error = new Error("Change publish membership failed. Id not found");
        error.name = "NotFound";
        throw error;
    }
    membership.published = !membership.published;
    return yield membership.save();
});
exports.patchPublishStatus = patchPublishStatus;
const updateMembership = (id, name, description, duration, price, discountPrice) => __awaiter(void 0, void 0, void 0, function* () {
    const membership = yield membership_model_1.default.findOne({
        _id: id,
        deletedAt: undefined,
    });
    if (!membership) {
        const error = new Error("Update membership failed, Id not found");
        error.name = "NotFound";
        throw error;
    }
    if (name)
        membership.name = name;
    if (description)
        membership.description = description;
    if (duration)
        membership.duration = duration;
    if (price)
        membership.price = price;
    if (discountPrice)
        membership.discountPrice = discountPrice;
    return yield membership.save();
});
exports.updateMembership = updateMembership;
const deleteMembership = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const membership = yield membership_model_1.default.findOne({
        _id: id,
        deletedAt: undefined,
    });
    if (!membership) {
        const error = new Error("Delete membership failed. Id not found");
        error.name = "NotFound";
        throw error;
    }
    membership.deletedAt = (0, dayjs_1.default)().toDate();
    return yield membership.save();
});
exports.deleteMembership = deleteMembership;
const registerMembership = (user, membershipId, paymentType) => __awaiter(void 0, void 0, void 0, function* () {
    const membership = yield membership_model_1.default.findOne({
        _id: membershipId,
        deletedAt: undefined,
        published: true,
    });
    if (!membership) {
        const error = new Error("Membership data not found");
        error.name = "BadRequest";
        throw error;
    }
    const currentTransaction = yield transaction_model_1.default.findOne({
        membership: membershipId,
        $and: [{ status: "pending" }, { paymentExpire: { $gt: (0, dayjs_1.default)().toDate() } }],
        member: user.id,
    }).sort({ createdAt: -1 });
    if (currentTransaction) {
        const error = new Error("You are have pending transaction first cancel first to make a new transaction");
        error.name = "BadRequest";
        throw error;
    }
    const paymentIntent = yield stripe_1.default.paymentIntents.create({
        amount: membership.price,
        currency: "usd",
        payment_method_types: ["card"],
    });
    const transaction = yield transaction_model_1.default.create({
        member: user.id,
        membership: membership.id,
        paymentType,
        clientSecret: paymentIntent.client_secret,
        totalPayment: membership.price -
            (membership.discountPrice ? membership.discountPrice : 0),
        status: "pending",
        paymentExpire: (0, dayjs_1.default)().add(1, "day"),
    });
    return transaction;
});
exports.registerMembership = registerMembership;
exports.default = {
    getMemberships: exports.getMemberships,
    addMembership: exports.addMembership,
    getMembershipById: exports.getMembershipById,
    patchPublishStatus: exports.patchPublishStatus,
    updateMembership: exports.updateMembership,
    deleteMembership: exports.deleteMembership,
    registerMembership: exports.registerMembership,
};
