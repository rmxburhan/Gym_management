const validate = require('../utils/validationRules');

const {
    getClassHandler,
    getClassesHandler,
    updateClassHandler,
    updateClassValidationRules,
    addClassHandler,
    addClassValidationRules,
    deleteClassHandler,
} = require('../controllers/classController');
const route = require('express').Router();

route.get('/', getClassesHandler);

route.post('/', addClassValidationRules(), validate, addClassHandler);

route.get('/:id', getClassHandler);

route.put('/:id', updateClassValidationRules(), validate, updateClassHandler);

route.delete('/:id', deleteClassHandler);

module.exports = route;
