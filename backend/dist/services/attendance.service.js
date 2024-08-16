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
exports.getStats = exports.getCount = exports.postCheckOut = exports.postCheckIn = exports.getAttendances = exports.getCode = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const attendancecode_model_1 = __importDefault(require("../models/attendancecode.model"));
const attendance_model_1 = __importDefault(require("../models/attendance.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const date_fns_1 = require("date-fns");
const getCode = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield attendancecode_model_1.default.findOne({
        expiresIn: { $gte: (0, dayjs_1.default)().toDate() },
    }).sort({ createdAt: -1 });
});
exports.getCode = getCode;
const getAttendances = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    const filterDate = {};
    if (query === null || query === void 0 ? void 0 : query.dateStart) {
        console.log(query.dateStart);
        try {
            const startDateFilter = new Date(query.dateStart.toString());
            filterDate['$gte'] = startDateFilter.setHours(0, 0, 0, 0);
            filter.checkInTime = filterDate;
        }
        catch (error) { }
    }
    if (query === null || query === void 0 ? void 0 : query.dateEnd) {
        console.log(query.dateEnd);
        try {
            const endDateFilter = new Date(query.dateEnd.toString());
            filterDate['$lte'] = endDateFilter.setHours(23, 59, 59, 599);
            filter.checkInTime = filterDate;
        }
        catch (error) { }
    }
    if ((query === null || query === void 0 ? void 0 : query.today) == 'true' || (query === null || query === void 0 ? void 0 : query.today) == '1') {
        console.log(typeof query.today);
        console.log(query.today);
        const dateNow = new Date();
        filter.checkInTime = {
            $gte: dateNow.setHours(0, 0, 0, 0),
            $lte: dateNow.setHours(23, 59, 59, 599),
        };
    }
    if (query === null || query === void 0 ? void 0 : query.userId) {
        console.log(query.userId);
        const member = yield user_model_1.default.findOne({
            _id: query.userId,
            deletedAt: undefined,
        });
        if (member) {
            filter.userId = member.id;
        }
    }
    if ((query === null || query === void 0 ? void 0 : query.checkout) == 'true' || (query === null || query === void 0 ? void 0 : query.checkout) == 'false') {
        filter.checkOutTime = undefined;
    }
    else if ((query === null || query === void 0 ? void 0 : query.checkout) == 'false' || (query === null || query === void 0 ? void 0 : query.checkout) == '0') {
        filter.checkOutTime = { $exists: true };
    }
    return yield attendance_model_1.default.find(filter)
        .sort({ createdAt: -1 })
        .populate('userId', 'name profile email');
});
exports.getAttendances = getAttendances;
const postCheckIn = (id, code) => __awaiter(void 0, void 0, void 0, function* () {
    const codeValid = yield attendancecode_model_1.default.findOne({
        expiresIn: { $gt: Date.now() },
    }).sort({ createdAt: -1 });
    if (!codeValid || (codeValid === null || codeValid === void 0 ? void 0 : codeValid.code) !== code) {
        const error = new Error('Code invalid');
        error.name = 'BadRequest';
        throw error;
    }
    const dateToday = new Date();
    const startHour = new Date(dateToday.setHours(0, 0, 0, 0));
    const endHour = new Date(dateToday.setHours(23, 59, 59, 999));
    const alreadyCheckIn = yield attendance_model_1.default.findOne({
        checkInTime: { $gte: startHour, $lte: endHour },
        userId: id,
        checkOutTime: undefined,
    });
    if (alreadyCheckIn) {
        const error = new Error('You already checkIn');
        error.name = 'BadRequest';
        throw error;
    }
    return yield attendance_model_1.default.create({
        userId: id,
        checkInTime: (0, dayjs_1.default)().toDate(),
    });
});
exports.postCheckIn = postCheckIn;
const postCheckOut = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const startHour = new Date(new Date().setHours(0, 0, 0, 0));
    const endHour = new Date(new Date().setHours(23, 59, 59, 999));
    const attendance = yield attendance_model_1.default.findOne({
        userId: id,
        checkInTime: { $gte: startHour, $lte: endHour },
        checkOutTime: undefined,
    }).sort({ createdAt: -1 });
    if (!attendance) {
        const error = new Error('Check out failed, Please checkIn first');
        error.name = 'BadRequest';
        throw error;
    }
    attendance.checkOutTime = new Date();
    return yield attendance.save();
});
exports.postCheckOut = postCheckOut;
const getCount = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = yield attendance_model_1.default.find({
        checkInTime: { $gte: (0, date_fns_1.startOfToday)(), $lte: (0, date_fns_1.endOfToday)() },
    });
    const checkIn = today.length;
    const checkOut = today.filter((x) => x.checkOutTime === undefined).length;
    return {
        todayCheckIn: checkIn,
        notCheckOut: checkOut,
    };
});
exports.getCount = getCount;
const getStats = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield attendance_model_1.default.aggregate([
        {
            $match: {
                checkInTime: {
                    $gte: (0, date_fns_1.startOfDay)(new Date(startDate)),
                    $lte: (0, date_fns_1.endOfDay)(new Date(endDate)),
                },
            },
        },
        {
            $project: {
                dateString: {
                    $dateToString: {
                        format: '%Y-%m-%d',
                        date: '$checkInTime',
                    },
                },
            },
        },
        {
            $group: {
                _id: '$dateString',
                count: { $sum: 1 },
            },
        },
        {
            $sort: { _id: 1 },
        },
        {
            $project: {
                date: '$_id',
                count: 1,
                _id: 0,
            },
        },
    ]);
});
exports.getStats = getStats;
// export const getMyAttendencesHistory = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { startDate, endDate } = req.query;
//     const user = (req as RequestAuth).user;
//     const filter: { checkInTime?: any; checkOutTime?: any; userId: string } = {
//       userId: (req as RequestAuth).user.id,
//     };
//     if (startDate != undefined) {
//       try {
//         const dateStartFilter = new Date(startDate.toString());
//         filter.checkInTime = dateStartFilter;
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     if (endDate != undefined) {
//       try {
//         const endDateFilter = new Date(endDate.toString());
//         filter.checkOutTime = endDateFilter;
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     const myAttendances = await Attendance.find(filter);
//     return res.status(200).json({
//       message: "Get history attendance data succes",
//       data: {
//         histories: myAttendances,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error,
//     });
//   }
// };
exports.default = {
    getCode: exports.getCode,
    getAttendances: exports.getAttendances,
    postCheckIn: exports.postCheckIn,
    postCheckOut: exports.postCheckOut,
    getCount: exports.getCount,
    getStats: exports.getStats,
};
