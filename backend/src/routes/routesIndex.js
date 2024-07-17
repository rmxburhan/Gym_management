const route = require('express').Router();
const authRoute = require('./authIndex');
const profileRoute = require('./profileRoute');
const attendanceRoute = require('./attendanceIndex');
const classRoute = require('./classRouteIndex');
const employeeRoute = require('./employeeIndex');
const authorize = require('../middleware/authorizationMiddleware');
const membershipRoute = require('./membershipIndex');
const membersRoute = require('./membersIndex');
const equipmentRoute = require('./equipmentIndex');

route.use('/auth', authRoute);
route.use('/attendances', attendanceRoute);
route.use('/classes', classRoute);
route.use('/memberships', membershipRoute);
route.use('/members', membersRoute);
route.use('/employees', authorize(['admin']), employeeRoute);
route.use('/profile', profileRoute);
route.use('/equipments', equipmentRoute);

module.exports = route;
