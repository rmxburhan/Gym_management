const route = require('express').Router();
const authRoute = require('./authIndex');
const userRoute = require('./userRoute');
const profileRoute = require('./profileRoute');
const attendanceRoute = require('./attendanceIndex');
const authorize = require('../middleware/authorizationMiddleware');

route.use('/auth', authRoute);
route.use('/profile', authorize, profileRoute);
route.use('/users', userRoute);
route.use('/attendances', authorize, attendanceRoute);

module.exports = route;
