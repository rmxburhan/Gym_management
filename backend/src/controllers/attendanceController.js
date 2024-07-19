const { body } = require('express-validator');
const AttendanceCode = require('../models/AttendanceCode');
const Attendance = require('../models/Attendance');
const Member = require('../models/User');
const visitValidationRules = () => {
    return [
        body('code')
            .exists()
            .withMessage('code is required')
            .isString()
            .withMessage(
                'code mus be a string, you can get the code in front desk.'
            )
            .trim()
            .escape(),
    ];
};

const checkInHandler = async (req, res) => {
    try {
        const { code } = req.body;

        const codeValid = await AttendanceCode.findOne({
            expiresIn: { $gt: Date.now() },
        });

        if (codeValid.code !== code) {
            return res.status(400).json({
                message: 'Code is invalid, pleat try again.',
            });
        }

        const dateToday = new Date();
        const startHour = new Date(dateToday.setHours(0, 0, 0, 0));
        const endHour = new Date(dateToday.setHours(23, 59, 59, 999));
        const alreadyCheckIn = await Attendance.findOne({
            checkInTime: { $gte: startHour, $lte: endHour },
            userId: req.user._id,
            checkOutTime: undefined,
        });
        console.log('Attendance exist', alreadyCheckIn);
        if (alreadyCheckIn) {
            return res.status(400).json({
                success: false,
                message: 'You already checkIn',
            });
        }
        const attendance = new Attendance({
            userId: req.user._id,
            checkInTime: new Date(),
        });

        await attendance.save();

        if (attendance) {
            return res.status(200).json({
                message: 'Check in success',
            });
        }

        return res.status(400).json({
            message: 'Check in failed, please contact the front desk',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong, checkIn request failed',
        });
    }
};

const checkOutHandler = async (req, res) => {
    try {
        const userId = req.user._id;

        const startHour = new Date(new Date().setHours(0, 0, 0, 0));
        const endHour = new Date(new Date().setHours(23, 59, 59, 999));
        const checkInData = await Attendance.findOne({
            userId,
            checkInTime: { $gte: startHour, $lte: endHour },
            checkOutTime: undefined,
        });

        if (!checkInData) {
            return res.status(400).json({
                message: 'Check out failed, Please checkIn first',
            });
        }

        checkInData.checkOutTime = new Date();
        await checkInData.save();

        return res.status(200).json({
            message: 'Checkout success',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Check out failed, something went wrong',
        });
    }
};

// for admin only
const getCheckInCode = async (req, res) => {
    try {
        const code = await AttendanceCode.findOne({
            expiresIn: { $gte: new Date() },
        });

        return res.status(200).json({
            message: 'Get checkin code success',
            data: {
                code,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Check in failed',
        });
    }
};

const getAttendances = async (req, res, next) => {
    try {
        const { today, startDate, endDate, memberId, checkOut } = req.query;
        const filter = {};

        const filterDate = {};
        if (startDate != undefined) {
            try {
                const startDateFilter = new Date(startDate);
                filterDate['$gte'] = startDateFilter.setHours(0, 0, 0, 0);
                filter.checkInTime = filterDate;
            } catch (error) {}
        }
        if (endDate != undefined) {
            try {
                const endDateFilter = new Date(endDate);
                filterDate['$lte'] = endDateFilter.setHours(23, 59, 59, 599);
                filter.checkInTime = filterDate;
            } catch (error) {}
        }

        if (today != undefined) {
            if (today == 'true' || today == '1') {
                const dateNow = new Date();
                filter.checkInTime = {
                    $gte: dateNow.setHours(0, 0, 0, 0),
                    $lte: dateNow.setHours(23, 59, 59, 599),
                };
            }
        }

        if (memberId) {
            const member = await Member.findOne({
                _id: memberId,
                deletedAt: undefined,
            });
            console.log('memberId', member);
            if (member) {
                filter.userId = member._id;
            }
        }

        if (checkOut != undefined) {
            if (checkOut == 'false' || checkOut == '0') {
                console.log('CheckOut', typeof checkOut);
                filter.checkOutTime = undefined;
            } else if (checkOut == 'true' || checkOut == '1') {
                console.log('CheckOut', checkOut);
                filter.checkOutTime = { $exists: true };
            }
        }
        console.log(filter);
        const datas = await Attendance.find(filter)
            .populate('memberDetail')
            .lean();
        const checkInCount = await Attendance.countDocuments({
            checkInTime: {
                $gte: new Date().setHours(0, 0, 0, 0),
                $lte: new Date().setHours(23.59, 59, 599),
            },
        });

        const checkOutCount = await Attendance.countDocuments({
            checkInTime: {
                $gte: new Date().setHours(0, 0, 0, 0),
                $lte: new Date().setHours(23.59, 59, 599),
            },
            checkOutTime: undefined,
        });
        return res.status(200).json({
            success: true,
            data: {
                todayCheckIn: checkInCount,
                todayUnCheckOut: checkOutCount,
                attendances: datas,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

// Get attendance history for member
const getMyAttendencesHistory = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const filter = { userId: req.user._id };

        if (startDate != undefined) {
            try {
                const dateStartFilter = new Date(startDate);
                filter.checkInTime = dateStartFilter;
            } catch (error) {
                console.error(error);
            }
        }
        if (endDate != undefined) {
            try {
                const endDateFilter = new Date(endDate);
                filter.checkOutTime = endDateFilter;
            } catch (error) {
                console.error(error);
            }
        }

        const myAttendances = await Attendance.find(filter);

        return res.status(200).json({
            message: 'Get history attendance data succes',
            data: {
                histories: myAttendances,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

module.exports = {
    checkInHandler,
    getAttendances,
    getMyAttendencesHistory,
    getCheckInCode,
    visitValidationRules,
    checkOutHandler,
};
