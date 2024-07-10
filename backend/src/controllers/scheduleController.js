const Schedule = require('../models/StaffSchedule');
const User = require('../models/User');
const { body } = require('express-validator');
const timeToSeconds = require('../utils/timeToSeconds');
const timeToSecond = require('../utils/timeToSeconds');

const addScheduleValidationRules = () => {
    return [
        body('staffId').exists().withMessage('staffId cannot be empty'),

        body('timeStart')
            .exists()
            .withMessage('timeStart cannot be empty')
            .isTime()
            .withMessage('timeStart is not valid time format'),

        body('timeEnd')
            .exists()
            .withMessage('timeEnd cannot be empty')
            .isTime()
            .withMessage('timeEnd is not valid time format'),

        body('day')
            .exists()
            .withMessage('day must be a string')
            .isArray()
            .withMessage('day must be an integer string'),
    ];
};

const updateScheduleValidationRules = () => {
    return [
        body('staffId').exists().withMessage('staffId cannot be empty'),

        body('timeStart')
            .exists()
            .withMessage('timeStart cannot be empty')
            .isTime()
            .withMessage('timeStart is not valid time format'),

        body('timeEnd')
            .exists()
            .withMessage('timeEnd cannot be empty')
            .isTime()
            .withMessage('timeEnd is not valid time format'),

        body('day')
            .exists()
            .withMessage('day must be a string')
            .isArray()
            .withMessage('day must be an integer string'),
    ];
};

const addSchedule = async (req, res) => {
    try {
        const { staffId, timeStart, timeEnd, day } = req.body;

        const staff = await User.findOne({
            _id: staffId,
            deletedAt: undefined,
        });

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: 'Add schedule failed, Id not found',
            });
        }

        const schedule = new Schedule({
            staffId,
            timeStart: timeToSeconds(timeStart),
            timeEnd: timeToSeconds(timeEnd),
            day,
        });

        await schedule.save();

        return res.status(200).json({
            success: true,
            message: 'Add schedule success',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const updateSchedule = async (req, res, next) => {
    try {
        const { timeStart, timeEnd, day } = req.body;

        const staff = await User.findOne({ _id: id, deletedAt: undefined });

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: 'Update schedule failed. Id not found',
            });
        }

        if (timeStart) staff.timeStart = timeToSeconds(timeStart);
        if (timeEnd) staff.timeEnd = timeToSeconds(timeEnd);
        if (day) staff.day = timeToSecond(day);

        await staff.save();

        if (timeStart)
            return res.status(200).json({
                success: true,
                message: 'Update schedule success',
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

module.exports = {
    addScheduleValidationRules,
    addSchedule,
    updateScheduleValidationRules,
    updateSchedule,
};
