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
const membership_service_1 = __importDefault(require("../services/membership.service"));
const membership_validator_1 = require("../validator/membership.validator");
const console_1 = require("console");
const route = (0, express_1.Router)();
route.get("/", (0, authorization_middleware_1.default)(["admin", "member"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const datas = yield membership_service_1.default.getMemberships(user.role === "member");
        return res.status(200).json({
            message: "Membership data success retrieved",
            data: datas,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.post("/", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = membership_validator_1.validateCreateMembershipInput.validate(req.body);
        if (input.error) {
            throw input.error;
        }
        const { name, description, duration, price, discountPrice } = input.value;
        const membership = yield membership_service_1.default.addMembership(name, description, duration, price, discountPrice);
        if (!membership) {
            throw new Error("Add membership failed");
        }
        return res.status(201).json({
            message: "Add membership success",
        });
    }
    catch (error) {
        next(error);
    }
}));
route.post("/register", (0, authorization_middleware_1.default)(["member"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { error, value } = membership_validator_1.validateInputRegisterMembership.validate(req.body);
        if (error) {
            throw error;
        }
        const { membershipId, paymentType } = value;
        if (!user.memberDetail) {
            const error = new Error("Please fill your detail information first.");
            error.name = "Unprocessable";
            throw error;
        }
        if (user.memberDetail.membership &&
            user.memberDetail.membership.status == true) {
            const error = new Error("You have membership active");
            error.name = "BadRequest";
            throw error;
        }
        const transaction = yield membership_service_1.default.registerMembership(user, membershipId, paymentType);
        if (!transaction) {
            const error = new Error("Create transaction failed");
            error.name = "BadRequest";
            throw error;
        }
        return res.status(200).json({
            message: "Please pay your bill within 1 days",
            data: {
                clientSecret: transaction.clientSecret,
                amount: transaction.totalPayment,
                expired: transaction.paymentExpire,
            },
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
        const membership = yield membership_service_1.default.getMembershipById(id, user.role === "member");
        if (!membership) {
            const error = new Error("Get membership failed. Id not found");
            error.name = "NotFound";
            throw error;
        }
        return res.status(200).json({
            message: "Membership data success retrieved",
            data: membership,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.put("/:id", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const input = membership_validator_1.validateUpdateMembershipInput.validate(req.body);
        if (input.error) {
            throw console_1.error;
        }
        const { name, description, duration, price, discountPrice } = input.value;
        const membership = yield membership_service_1.default.updateMembership(id, name, description, duration, price, discountPrice);
        return res.status(200).json({
            message: "Update membership success",
            data: membership,
        });
    }
    catch (error) {
        next(error);
    }
}));
route.delete("/:id", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield membership_service_1.default.deleteMembership(id);
        return res.status(204).end();
    }
    catch (error) {
        next(error);
    }
}));
route.patch("/:id/publish", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const membership = yield membership_service_1.default.patchPublishStatus(id);
        return res.status(200).json({
            message: "Membership status has been updated.",
            data: membership,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = route;
