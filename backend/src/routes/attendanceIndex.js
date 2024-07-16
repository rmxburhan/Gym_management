const route = require('express').Router();
const {
    getMyAttendencesHistory,
    visitValidationRules,
    getAttendances,
    checkInHandler,
    getCheckInCode,
    checkOutHandler,
} = require('../controllers/attendanceController');
const validate = require('../utils/validationRules');

const authorize = require('../middleware/authorizationMiddleware');

route.get('/', authorize(['admin']), getAttendances);

route.get('/code', authorize(['admin']), getCheckInCode);

// GET : get all my history attendance
route.get('/history', authorize(['member']), getMyAttendencesHistory);

// POST : check in and record member attendance
route.post(
    '/check_in',
    authorize(['member']),
    visitValidationRules(),
    validate,
    checkInHandler
);
route.post('/check_out', authorize(['member']), checkOutHandler);

module.exports = route;
