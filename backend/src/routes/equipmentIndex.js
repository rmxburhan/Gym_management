const route = require('express').Router();
const validate = require('../utils/validationRules');
const authorize = require('../middleware/authorizationMiddleware');
const {
    getEquipments,
    getEquipment,
    getEquipmentLogs,
    addEquipment,
    addLogEquipment,
    addLogEquipmentValidationRules,
    deleteEquipment,
    updateEquipmentValidationRules,
    updateEquipment,
    getLogs,
} = require('../controllers/equipmentController');
const { uploadSingle } = require('../utils/upload');

route.get('/', authorize(['admin']), getEquipments);
route.post(
    '/',
    authorize(['admin']),
    uploadSingle('image', true),
    addEquipment
);
route.get('/logs', authorize(['admin']), getLogs);
route.get('/:id', authorize(['admin']), getEquipment);
route.put(
    '/:id',
    authorize(['admin']),
    updateEquipmentValidationRules(),
    validate,
    updateEquipment
);
route.delete('/:id', authorize(['admin']), deleteEquipment);
route.post(
    '/:id/logs',
    authorize(['admin']),
    addLogEquipmentValidationRules(),
    validate,
    addLogEquipment
);

route.get('/:id/logs', authorize(['admin']), getEquipmentLogs);

module.exports = route;
