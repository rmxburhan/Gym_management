const route = require('express').Router();
const {
    addMembershipHandler,
    getMembershipById,
    getAllMemberships,
    addMembershipValidationRules,
    publishMembership,
    deleteMembership,
    updateMembershipValidationRules,
    updateMembershipHandler,
    registerMembership,
    registerMembershipValidationRules,
} = require('../controllers/membershipController');
const validate = require('../utils/validationRules');
const authorize = require('../middleware/authorizationMiddleware');

route.get('/', authorize(['admin']), getAllMemberships);

route.post(
    '/',
    authorize(['admin']),
    addMembershipValidationRules(),
    validate,
    addMembershipHandler
);

route.post('/publish/:id', authorize(['admin']), publishMembership);

route.get('/:id', authorize(['admin']), getMembershipById);

route.put(
    '/:id',
    authorize(['admin']),
    updateMembershipValidationRules(),
    validate,
    updateMembershipHandler
);

route.delete('/:id', authorize(['admin']), deleteMembership);

// for member

route.post(
    '/register',
    authorize(['member']),
    registerMembershipValidationRules(),
    validate,
    registerMembership
);

module.exports = route;
