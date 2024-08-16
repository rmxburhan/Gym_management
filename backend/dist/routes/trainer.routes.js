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
const trainer_service_1 = __importDefault(require("../services/trainer.service"));
const trainer_validator_1 = require("../validator/trainer.validator");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const upload_1 = require("../utils/upload");
const authorization_middleware_1 = __importDefault(require("../middleware/authorization.middleware"));
const route = (0, express_1.Router)();
/**
 * @api {get}
 * @apiName Get Trainers
 * @apiGroup Trainers
 *
 * @apiSuccess 200
 */
route.get("/", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainers = yield trainer_service_1.default.getTrainers();
        return res.status(200).json({
            message: "Trainer data success retrieved",
            data: trainers,
        });
    }
    catch (error) {
        next(error);
    }
}));
/**
 * @api {post}
 * @apiName Create Trainer
 * @apiGroup Trainers
 *
 * @apiParam {String} name: body
 * @apiParam {String} email: body
 * @apiParam {String} password: body
 * @apiParam {Array[]} addresses: body
 * @apiParam {String} bank: body
 * @apiParam {Number} bankNumber: body
 * @apiParam {String} phoneNumber: body
 * @apiParam {String} identificationNumber: body
 * @apiParam {Image} profile: body
 *
 * @apiSuccess 200
 * @apiError 404, 400
 */
route.post("/", (0, authorization_middleware_1.default)(["admin"]), (0, upload_1.uploadSingle)("profile"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = trainer_validator_1.validaAddTrainerInput.validate(req.body);
        const { name, email, password, addresses, bank, bankNumber, phoneNumber, identificationNumber, gender, } = input.value;
        const profile = req.file;
        if (input.error) {
            throw input.error;
        }
        let trainer = yield trainer_service_1.default.addTrainer(name, email, password, addresses, bank, bankNumber, identificationNumber, phoneNumber, gender, profile);
        if (!trainer) {
            throw new Error("Add trainer failed");
        }
        return res.status(201).json({
            message: "Add tariner success",
        });
    }
    catch (error) {
        if (req.file) {
            if ((0, fs_1.existsSync)(path_1.default.join(process.cwd(), req.file.path))) {
                (0, fs_1.unlinkSync)(path_1.default.join(process.cwd(), req.file.path));
            }
        }
        next(error);
    }
}));
route.get("/:id", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield trainer_service_1.default.getTrainer(id);
        if (!data) {
            const error = new Error("Get trainer failed. Id not found");
            error.name = "NotFound";
            throw error;
        }
        return res.status(200).json({
            message: "Trainer data success retrieved",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}));
/**
 * @api {post}
 * @apiName Update Trainer
 * @apiGroup Trainers
 *
 * @apiParam {String} name?: body
 * @apiParam {String} email?: body
 * @apiParam {String} password?: body
 * @apiParam {Array[]} addresses?: body
 * @apiParam {String} bank?: body
 * @apiParam {Number} bankNumber?: body
 * @apiParam {String} phoneNumber?: body
 * @apiParam {String} identificationNumber?: body
 * @apiParam {Image} profile?: body
 *
 * @apiSuccess 200
 * @apiError 404, 400
 */
route.post("/:id", (0, authorization_middleware_1.default)(["admin"]), (0, upload_1.uploadSingle)("profile"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const profile = req.file;
        const input = trainer_validator_1.validateUpdateTrainerInput.validate(req.body);
        const { name, email, password, addresses, bank, bankNumber, phoneNumber, identificationNumber, gender, } = input.value;
        if (input.error) {
            throw input.error;
        }
        let trainer = yield trainer_service_1.default.updateTrainer(id, name, email, password, addresses, bank, bankNumber, phoneNumber, identificationNumber, gender, profile);
        return res.status(200).json({
            message: "Update trainer succes.",
            data: trainer,
        });
    }
    catch (error) {
        if (req.file) {
            const pathToFile = path_1.default.join(process.cwd(), req.file.path);
            if ((0, fs_1.existsSync)(pathToFile)) {
                (0, fs_1.unlinkSync)(pathToFile);
            }
        }
        next(error);
    }
}));
/**
 * @api {delete}
 * @apiName Delete Trainer
 * @apiGroup Trainers
 *
 * @apiParam {String} id: parameter
 *
 * @apiSuccess 204
 * @apiError 404
 */
route.delete("/:id", (0, authorization_middleware_1.default)(["admin"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield trainer_service_1.default.deleteTrainer(id);
        return res.status(204).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.default = route;
