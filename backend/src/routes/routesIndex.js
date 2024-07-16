const route = require('express').Router();
const authRoute = require('./authIndex');
const userRoute = require('./userRoute');
const profileRoute = require('./profileRoute');
const attendanceRoute = require('./attendanceIndex');
const classRoute = require('./classRouteIndex');
const employeeRoute = require('./employeeIndex');
const authorize = require('../middleware/authorizationMiddleware');
const adminSeed = require('../seef/seedDatabase');
const membershipRoute = require('./membershipIndex');

route.use('/auth', authRoute);
route.use('/attendances', attendanceRoute);
route.use('/classes', classRoute);
route.use('/memberships', membershipRoute);
route.use('/users', authorize(['admin']), userRoute);
route.use('/employees', authorize(['admin']), employeeRoute);
route.use('/profile', authorize(['admin', 'member', 'employee']), profileRoute);
// route.get('/seedAdmin', adminSeed);

module.exports = route;
