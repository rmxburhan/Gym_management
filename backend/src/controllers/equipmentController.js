const Equipment = require('../models/Equipment');
const EquipmentLog = require('../models/EquipmentLog');
const { body } = require('express-validator');
const fs = require('fs');
const addEquipmentValidationRules = () => {
    return [
        body('name')
            .exists()
            .withMessage('name cannot be empty')
            .isString()
            .withMessage('name must be a string'),
        body('qty')
            .exists()
            .withMessage('qty cannot be empty')
            .isInt()
            .withMessage('qty must be an integer'),
    ];
};

const updateEquipmentValidationRules = () => {
    return [
        body('name').optional().isString().withMessage('name must be a string'),
        body('qty').optional().isInt().withMessage('qty must be an integer'),
    ];
};

const getEquipments = async (req, res, next) => {
    try {
        const { name } = req.query;
        const filter = { deletedAt: undefined };
        if (name != undefined) {
            filter.name = { $regex: '^' + name };
        }
        const datas = await Equipment.find(filter);
        return res.status(200).json({
            success: true,
            data: {
                equipments: datas,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const getEquipment = async (req, res, next) => {
    try {
        const { log } = req.query;
        const { id } = req.params;

        let equipment = await Equipment.findOne({
            _id: id,
            deletedAt: undefined,
        });
        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: 'Get equipment failed, Id not found',
            });
        }

        if (log == 'true' || log == '1') {
            equipment = await Equipment.populate(equipment, {
                path: 'equipmentLogs',
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                equipment,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const addEquipment = async (req, res, next) => {
    try {
        const { name, qty } = req.body;
        console.log(req.body);
        const data = new Equipment({
            name,
            qty,
        });
        console.log(req.file);
        if (req.file != undefined) {
            data.image = req.file.path.split('public')[1];
        }
        await data.save();

        return res.status(200).json({
            success: true,
            message: 'Add equipment success',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const updateEquipment = async (req, res, next) => {
    try {
        const { name, qty } = req.body;
        const { id } = req.params;

        const data = await Equipment.findOne({ _id: id, deletedAt: undefined });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Update equipment failed, Id not found',
            });
        }
        if (name) data.name = name;
        if (qty) data.qty = qty;
        if (req.file != undefined) {
            if (fs.existsSync(path.join(process.cwd(), 'public', data.image))) {
                fs.unlink(path.join(process.cwd(), 'public', data.image));
            }
            data.image = req.file.path;
        }

        await data.save();

        return res.status(200).json({
            success: true,
            message: 'Update equipment successs',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const deleteEquipment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const equipment = await Equipment.findOne({
            _id: id,
            deletedAt: undefined,
        });

        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: 'Delete equipment failed. Id not found',
            });
        }
        equipment.deletedAt = new Date();
        await equipment.save();
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const addLogEquipmentValidationRules = () => {
    return [
        body('description').exists().withMessage('description cannot be empty'),
        body('category')
            .exists()
            .withMessage('category cannot be empty')
            .isIn(['maintenance', 'return', 'sell', 'buy'])
            .withMessage(
                'category can only contain maintenance, retur, sell and buy'
            ),
        body('qty').optional().isInt().withMessage('qty must be an integer'),
    ];
};

const addLogEquipment = async (req, res, next) => {
    try {
        const { description, category, qty } = req.body;
        const { id } = req.params;
        const newLog = new EquipmentLog({
            equipmentId: id,
            adminId: req.user._id,
            description: description,
            category,
            qty,
        });
        console.log(newLog);

        await newLog.save();

        return res.status(200).json({
            success: true,
            message: 'Add log success',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const getEquipmentLogs = async (req, res, next) => {
    try {
        const { id } = req.params;

        const logs = await EquipmentLog.find({ equipmentId: id }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            data: {
                equipmentLogs: logs,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const getLogs = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const filterDate = {};
        const filter = {};
        if (startDate != undefined) {
            try {
                filterDate['$gte'] = new Date(startDate).setHours(0, 0, 0, 0);
                filter.createdAt = filterDate;
            } catch (error) {}
        }
        if (endDate != undefined) {
            try {
                filterDate['$lte'] = new Date(endDate).setHours(
                    23,
                    59,
                    59,
                    599
                );
                filter.createdAt = filterDate;
            } catch (error) {}
        }
        console.log(filter);
        const logs = await EquipmentLog.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: {
                equipmentLogs: logs,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

module.exports = {
    getEquipment,
    getEquipments,
    getEquipmentLogs,
    addEquipment,
    addEquipmentValidationRules,
    addLogEquipment,
    addLogEquipmentValidationRules,
    updateEquipment,
    updateEquipmentValidationRules,
    deleteEquipment,
    getLogs,
};
