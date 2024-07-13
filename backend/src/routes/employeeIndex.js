const {
    addEmployee,
    getAllEmployees,
    getDetailEmployee,
    updateEmployee,
    addEmployeeValidationRules,
    updateEmployeeValidationRules,
} = require('../controllers/employeeController');

const validate = require('../utils/validationRules');
const route = require('express').Router();

route.get('/', getAllEmployees);
route.post('/', addEmployeeValidationRules(), validate, addEmployee);
route.get('/:id', getDetailEmployee);
route.post('/:id', updateEmployeeValidationRules(), validate, updateEmployee);

module.exports = route;
