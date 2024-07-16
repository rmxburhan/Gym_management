const {
    getClassHandler,
    getClassesHandler,
    updateClassHandler,
    updateClassValidationRules,
    addClassHandler,
    addClassValidationRules,
    deleteClassHandler,
} = require('../controllers/classController');
const validate = require('../utils/validationRules');
const authorize = require('../middleware/authorizationMiddleware');
const route = require('express').Router();

route.get('/', authorize(['admin', 'employee', 'member']), getClassesHandler);

route.get('/:id', authorize(['admin', 'staff', 'member']), getClassHandler);

route.post(
    '/',
    authorize(['admin']),
    addClassValidationRules(),
    validate,
    addClassHandler
);

route.put(
    '/:id',
    authorize(['admin']),
    updateClassValidationRules(),
    validate,
    updateClassHandler
);

route.delete('/:id', authorize(['admin']), deleteClassHandler);

module.exports = route;
