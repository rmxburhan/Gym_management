const Class = require('../models/Class');
const User = require('../models/User');
const { body } = require('express-validator');

const addClassValidationRules = () => {
    return [
        body('name')
            .exists()
            .withMessage('name cannot be empty')
            .isString()
            .withMessage('name must be a string'),

        body('description')
            .exists()
            .withMessage('description cannot be empty')
            .isString()
            .withMessage('description must be a string'),

        body('trainerId').exists().withMessage('trainer id cannot be empty'),
        body('classCategory')
            .exists()
            .withMessage('class category cannot be empty')
            .isIn(['asd']),

        body('maxParticipant')
            .exists()
            .withMessage('max participant cannot be empty')
            .isInt()
            .withMessage('max participant must be an int'),

        body('date')
            .exists()
            .withMessage('date cannot be empty')
            .isDate()
            .withMessage('input date with a correct format'),
    ];
};
const updateClassValidationRules = () => {
    return [
        body('name').optional().isString().withMessage('name must be a string'),

        body('description')
            .optional()
            .isString()
            .withMessage('description must be a string'),

        body('trainerId').optional(),
        body('maxParticipant')
            .optional()
            .isInt()
            .withMessage('max participant must be an int'),

        body('date')
            .optional()
            .isDate()
            .withMessage('input date with a correct format'),
    ];
};

const addClassHandler = async (req, res) => {
    try {
        const {
            name,
            description,
            classCategory,
            trainerId,
            maxParticipant,
            date,
        } = req.body;

        // TODO : verified if it is treal trainer
        const trainer = await User.findOne({
            _id: trainerId,
            deletedAt: undefined,
        });

        if (!trainer) {
            return res.status(404).json({
                success: false,
                message: 'Add class failed, Id trainer not found',
            });
        }

        const classData = new Class({
            name,
            description,
            classCategory,
            trainerId,
            maxParticipant,
            date,
        });

        await classData.save();

        return res.status(200).json({
            success: true,
            message: 'Class has been added',
        });
    } catch (error) {
        return res.status(500).json({
            succes: false,
            error,
        });
    }
};

const updateClassHandler = async (req, res) => {
    try {
        const {
            name,
            description,
            classCategory,
            trainerId,
            maxParticipant,
            date,
        } = req.body;
        const { id } = req.params;
        const classData = await Class.findOne({
            _id: id,
            deletedAt: undefined,
        });
        if (!classData) {
            return res.status(404).json({
                success: false,
                message: 'Update class failed, Id not found',
            });
        }

        if (name) classData.name = name;
        if (description) classData.description = description;
        if (classCategory) classData.classCategory = classCategory;
        if (trainerId) {
            const trainer = await User.findOne({
                _id: trainerId,
                deletedAt: undefined,
            });
            if (!trainer) {
                return res.status(404).json({
                    success: false,
                    message: 'Update class failed. Trainer id not found',
                });
            }

            classData.trainerId = trainerId;
        }

        if (maxParticipant) classData.maxParticipant = maxParticipant;
        if (date) classData.date = date;

        await classData.save();

        return res.status(200).json({
            success: true,
            message: 'Update class success',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const deleteClassHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const classData = await Class.findOne({
            _id: id,
            deletedAt: undefined,
        });

        if (!classData) {
            return res.status(404).json({
                success: false,
                message: 'Delete class failed, Id not found',
            });
        }

        classData.deletedAt = new Date();
        await classData.save();

        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const getClassesHandler = async (req, res, next) => {
    try {
        // TODO : apply search and filtering

        const datas = await Class.find({});

        return res.status(200).json({
            success: true,
            message: 'Get class success',
            data: {
                classes: datas,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const getClassHandler = async (req, res, next) => {
    try {
        const { id } = req.params;

        const classData = await Class.fineOne({
            _id: id,
            deletedAt: undefined,
        });

        if (!classData) {
            return res.statsu(404).json({
                success: false,
                message: 'Get class failed, Id not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Get class success',
            data: {
                class: classData,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

module.exports = {
    addClassHandler,
    addClassValidationRules,
    updateClassValidationRules,
    updateClassHandler,
    deleteClassHandler,
    updateClassHandler,
    getClassesHandler,
    getClassHandler,
};
