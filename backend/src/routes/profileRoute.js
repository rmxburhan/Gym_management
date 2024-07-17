const route = require('express').Router();
const {
    getMyProfile,
    updateProfileImage,
    updateProfileRules,
    getProfileImage,
    updateMyProfile,
} = require('../controllers/profileController');
const {
    getMyAttendencesHistory,
} = require('../controllers/attendanceController');
// const { updateMyDetail } = require('../controllers/memberController');
const validate = require('../utils/validationRules');
const { uploadSingle } = require('../utils/upload');
const authorize = require('../middleware/authorizationMiddleware');
route.get('/', authorize(['admin', 'member', 'employee']), getMyProfile);
route.put(
    '/',
    authorize(['admin', 'member', 'employee']),
    updateProfileRules(),
    validate,
    updateMyProfile
);
// route.post('/detail', updateMyDetail);
route.get(
    '/image',
    authorize(['admin', 'member', 'employee']),
    getProfileImage
);
route.post(
    '/image',
    authorize(['admin', 'member', 'employee']),
    uploadSingle('profilePicture'),
    updateProfileImage
);
route.get('/attendances', authorize(['member']), getMyAttendencesHistory);

module.exports = route;
