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
route.use('/profile', authorize(['admin', 'member', 'employee']), profileRoute);
route.use('/users', authorize(['admin']), userRoute);
route.use('/attendances', authorize(['admin']), attendanceRoute);
route.use('/classes', authorize(['admin']), classRoute);
route.use('/employees', authorize(['admin']), employeeRoute);
route.get('/seedAdmin', adminSeed);
route.use('/memberships', authorize(['admmin']), membershipRoute);

module.exports = route;
