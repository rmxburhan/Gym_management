const route = require('express').Router();
const {
    addMembershipHandler,
    getMembershipById,
    getAllMemberships,
    addMembershipValidationRules,
    publishMembership,
    deleteMembership,
    publishMemberValidationRules,
    updateMembershipValidationRules,
    updateMembershipHandler,
} = require('../controllers/membershipController');
const validate = require('../utils/validationRules');

route.get('/', getAllMemberships);

route.post('/', addMembershipValidationRules(), validate, addMembershipHandler);

route.post('/publish/:id', publishMembership);

route.get('/:id', getMembershipById);

route.put(
    '/:id',
    updateMembershipValidationRules(),
    validate,
    updateMembershipHandler
);

route.delete('/:id', deleteMembership);

module.exports = route;
