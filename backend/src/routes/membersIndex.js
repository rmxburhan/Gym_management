const {
    addMember,
    addMemberValidationRules,
    getMember,
    deleteMember,
    updateMember,
    updateMemberValidationRules,
    getMembers,
} = require('../controllers/memberController');
const route = require('express').Router();
const authorize = require('../middleware/authorizationMiddleware');
const validate = require('../utils/validationRules');

route.get('/', authorize(['admin']), getMembers);
route.post(
    '/',
    authorize(['admin']),
    addMemberValidationRules(),
    validate,
    addMember
);
route.get('/:id', authorize(['admin']), getMember);
route.put(
    '/:id',
    authorize(['admin']),
    updateMemberValidationRules(),
    validate,
    updateMember
);
route.delete('/:id', authorize(['admin']), deleteMember);

module.exports = route;
