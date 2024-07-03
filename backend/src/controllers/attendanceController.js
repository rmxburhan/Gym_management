const { body } = require('express-validator');
const AttendanceCode = require('../models/AttendanceCode');
const Attendance = require('../models/Attendance');
const moment = require('moment-timezone');
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
            expiresIn: { $gt: Date.now() },
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

// TODO : appliy filter in getAllVisits
// and get more info like how many today attendances who is the newest arrival and so on
const getAttendences = async (req, res, next) => {
    try {
        const datas = await Attendance.find();

        return res.status(200).json({
            success: true,
            data: {
                memberLog: datas,
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
// TODO : apply serach and filtering function
const getMyAttendencesHistory = async (req, res, next) => {
    try {
        const myAttendances = await Attendance.find({ userId: req.user._id });

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
    getAttendences,
    getMyAttendencesHistory,
    getCheckInCode,
    visitValidationRules,
    checkOutHandler,
};
