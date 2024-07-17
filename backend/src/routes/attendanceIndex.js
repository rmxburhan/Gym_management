const route = require('express').Router();
const {
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

route.post(
    '/check_in',
    authorize(['member']),
    visitValidationRules(),
    validate,
    checkInHandler
);
route.post('/check_out', authorize(['member']), checkOutHandler);

module.exports = route;
