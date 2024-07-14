const route = require('express').Router();
const authRoute = require('./authIndex');
const userRoute = require('./userRoute');
const profileRoute = require('./profileRoute');
const attendanceRoute = require('./attendanceIndex');
const classRoute = require('./classRouteIndex');
const employeeRoute = require('./employeeIndex');
const authorize = require('../middleware/authorizationMiddleware');
const adminSeed = require('../seef/seedDatabase');

const {
    adminAuthorize,
    staffAuthorize,
    trainerAuthorize,
    memberAuthorize,
} = require('../middleware/authorization');

route.use('/auth', authRoute);
route.use('/profile', authorize, profileRoute);
route.use('/users', authorize, adminAuthorize, userRoute);
route.use('/attendances', authorize, attendanceRoute);
route.use('/classes', authorize, classRoute);
route.use('/employees', authorize, adminAuthorize, employeeRoute);
route.get('/seedAdmin', adminSeed);

module.exports = route;
