const Membership = require('../models/Membership');
const { body } = require('express-validator');

const addMembershipValidationRules = () => {
    return [
        body('name')
            .exists()
            .withMessage('name cannot be empty')
            .isString('name must be a string')
            .trim()
            .escape(),

        body('description')
            .exists()
            .withMessage('description cannot be empty')
            .isString()
            .withMessage('description must be a string'),

        body('duration')
            .exists()
            .withMessage('duration cannot be empty')
            .isInt()
            .withMessage('duration must be an int, day format'),

        body('price')
            .exists()
            .withMessage('price cannot be empty')
            .isInt()
            .withMessage('price must be a number'),

        body('discountPrice')
            .optional()
            .isInt()
            .withMessage('discount price cannot be empty'),
    ];
};

const updateMembershipValidationRules = () => {
    return [
        body('name')
            .optional()
            .withMessage('name cannot be empty')
            .isString('name must be a string')
            .trim()
            .escape(),

        body('description')
            .optional()
            .withMessage('description cannot be empty')
            .isString()
            .withMessage('description must be a string'),

        body('duration')
            .optional()
            .withMessage('duration cannot be empty')
            .isInt()
            .withMessage('duration must be an int, day format'),

        body('price')
            .optional()
            .withMessage('price cannot be empty')
            .isInt()
            .withMessage('price must be a number'),

        body('discountPrice')
            .optional()
            .isInt()
            .withMessage('discount price cannot be empty'),
    ];
};

const publishMemberValidationRules = () => {
    return [
        body('publish')
            .exists()
            .withMessage('publish cannot be empty')
            .isBoolean()
            .withMessage('publish must be a boolean'),
    ];
};

const addMembershipHandler = async (req, res, next) => {
    try {
        const { name, description, duration, price, discountPrice } = req.body;

        const membership = new Membership({
            name,
            description,
            duration,
            price,
            discountPrice,
        });

        await membership.save();

        return res.status(200).json({
            success: true,
            data: {
                membership,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const getAllMemberships = async (req, res) => {
    try {
        const datas = await Membership.find({ deletedAt: undefined });

        return res.status(200).json({
            success: true,
            data: {
                memberships: datas,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const getMembershipById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const membership = await Membership.findOne({
            _id: id,
            deletedAt: undefined,
        });

        if (!membership) {
            return res.status(404).json({
                success: false,
                message: 'Get membership failed, Id not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                membership,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const publishMembership = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { publish } = req.body;

        const data = await Membership.findOne({
            _id: id,
            deletedAt: undefined,
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Set publish membership failed, Id not found',
            });
        }

        if (data.published == publish) {
            return res.status(400).json({
                success: false,
                message: 'Published data is already,' + ` ${data.published}`,
            });
        }

        data.published = published;

        await data.save();

        return res.status(200).json({
            success: true,
            message: 'Chnage published data success',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const deleteMembership = async (req, rese, next) => {
    try {
        const { id } = req.params;
        const membership = await Membership.findOne({
            _id: id,
            deletedAt: undefined,
        });

        if (!membership) {
            return res.status(404).json({
                success: false,
                message: 'Delete membership failed, membership not fund',
            });
        }

        membership.deletedAt = new Date();
        await membership.save();
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const updateMembershipHandler = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { name, description, duration, price, discountPrice } = req.body;

        const membership = await Membership.findOne({
            _id: id,
            deletedAt: undefined,
        });

        if (!membership) {
            return res.status(404).json({
                success: false,
                message: 'Update membership failed, Id not found',
            });
        }

        if (name) membership.name = name;
        if (description) membership.description = description;
        if (duration) membership.duration = duration;
        if (price) membership.price = price;
        if (discountPrice) membership.discountPrice = discountPrice;

        await membership.save();

        return res.status(200).json({
            success: true,
            message: 'Update membership success',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

module.exports = {
    addMembershipValidationRules,
    publishMemberValidationRules,
    addMembershipHandler,
    getAllMemberships,
    getMembershipById,
    publishMembership,
    deleteMembership,
    updateMembershipHandler,
    updateMembershipValidationRules,
};
