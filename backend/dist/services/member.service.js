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
exports.updateMember = exports.addMember = exports.deleteMember = exports.getMember = exports.getMembers = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const getMembers = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, gender, active, }) {
    const filter = {
        deletedAt: undefined,
        role: "member",
    };
    if (name)
        filter.name = { $regex: "^" + name };
    if (gender == "male")
        filter.gender = "male";
    else if (gender == "female")
        filter.gender = "female";
    let members = yield user_model_1.default.find(filter).sort({ createdAt: -1 });
    //   .populate({
    //     path: "membershipDetail",
    // match: { expiresDate: { $gte: new Date() } },
    //   });
    //   if (active != undefined) {
    //     if (active == "false" || active == "0") {
    //       dataResponse = dataResponse.filter(
    //         (x) => x.membershipDetail?.length == 0
    //       );
    //     } else if (active == "true" || active == "1") {
    //       dataResponse = dataResponse.filter(
    //         (x) => x.membershipDetail?.length != 0
    //       );
    //     }
    //   }
    return members;
});
exports.getMembers = getMembers;
const getMember = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.default.findOne({ _id: id, deletedAt: undefined, role: "member" }); });
exports.getMember = getMember;
const deleteMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield user_model_1.default.findOne({
        _id: id,
        deletedAt: undefined,
        role: "member",
    });
    if (!member) {
        const error = new Error("Delete member failed. Id not found");
        error.name = "NotFound";
        throw error;
    }
    member.deletedAt = (0, dayjs_1.default)().toDate();
    return yield member.save();
});
exports.deleteMember = deleteMember;
const addMember = (name, password, email, addresses, birthDate, gender, phoneNumber, profile) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield user_model_1.default.findOne({ email, deletedAt: undefined });
    if (exist) {
        const error = new Error("Email already taken. try another email");
        error.name = "BadRequest";
        throw error;
    }
    const member = new user_model_1.default({
        name,
        password,
        email,
        role: "member",
        memberDetail: {
            address: addresses,
            birthDate,
            gender,
            phoneNumber,
        },
    });
    if (profile) {
        member.profile = profile.path.split("public/")[1];
    }
    return yield member.save();
});
exports.addMember = addMember;
const updateMember = (id, name, password, email, addresses, birthDate, gender, phoneNumber, profile) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield user_model_1.default.findOne({ _id: id, deletedAt: undefined });
    if (!exist) {
        const error = new Error("Update member failed. Id not found");
        error.name = "BadRequest";
        throw error;
    }
    if (name)
        exist.name = name;
    if (password)
        exist.password = password;
    if (email)
        exist.email = email;
    if (addresses)
        exist.memberDetail.address = addresses;
    if (birthDate)
        exist.memberDetail.birthDate = birthDate;
    if (gender)
        exist.memberDetail.gender = gender;
    if (phoneNumber)
        exist.memberDetail.phoneNumber = phoneNumber;
    if (profile)
        exist.profile = profile.path.split("public/")[1];
    return yield exist.save();
});
exports.updateMember = updateMember;
exports.default = {
    getMembers: exports.getMembers,
    getMember: exports.getMember,
    deleteMember: exports.deleteMember,
    addMember: exports.addMember,
    updateMember: exports.updateMember,
};
