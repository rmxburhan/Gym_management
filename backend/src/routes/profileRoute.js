const route = require('express').Router();
const {
    getMyData,
    updateProfileRules,
    updateMyProfile,
    updateProfileImage,
    getProfileImage,
} = require('../controllers/userController');
const validate = require('../utils/validationRules');
const { uploadSingle } = require('../utils/upload');
route.get('/', getMyData);

route.put('/', updateProfileRules(), validate, updateMyProfile);
route.get('/image', getProfileImage);
route.post('/image', uploadSingle('profilePicture'), updateProfileImage);

module.exports = route;
