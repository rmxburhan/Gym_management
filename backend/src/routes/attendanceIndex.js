const route = require('express').Router();
const {
    getMyAttendencesHistory,
    visitValidationRules,
    getAttendences,
    checkInHandler,
    getCheckInCode,
    checkOutHandler,
} = require('../controllers/attendanceController');
const validate = require('../utils/validationRules');

const AttendanceCode = require('../models/AttendanceCode');

route.get('/', getAttendences);

route.get('/code', getCheckInCode);

// GET : get all my history attendance
route.get('/history', getMyAttendencesHistory);

// POST : check in and record member attendance
route.post('/check_in', visitValidationRules(), validate, checkInHandler);
route.post('/check_out', checkOutHandler);

route.get('/seed', async (req, res) => {
    const data = new AttendanceCode({
        code: 'HALOHALOHALOHALO',
        expiresIn: new Date(new Date().setHours(23, 59, 59)),
        createdIn: new Date(new Date().setHours(0, 0, 0)),
    });

    await data.save();

    return res.status(200).json({
        message: 'Success',
        data,
    });
});

module.exports = route;
