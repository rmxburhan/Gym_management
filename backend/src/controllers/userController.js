const User = require('../models/User');
const { query, body } = require('express-validator');
const UserMembership = require('../models/UserMembership');

const getMyData = async (req, res) => {
    try {
        const user = req.user;

        return res.status(200).json({
            success: true,
            data: {
                user,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const filterMemberRules = () => {
    return [
        query('active')
            .optional()
            .isBoolean()
            .withMessage('active query must be boolean'),
        query('name').optional(),
        query('gender').optional(),
    ];
};

const getAllMembers = async (req, res, next) => {
    try {
        const { active, name, gender } = req.query;

        const filter = {};

        active != undefined ? (filter.active = active) : undefined;
        name != undefined ? (filter.name = name) : undefined;
        gender != undefined ? (filter.gender = gender) : undefined;
        filter.deletedAt = undefined || null;

        console.log('Filter log in geAllMembers', filter);

        const members = await User.find({ deletedAt: undefined });

        return res.status(200).json({
            success: true,
            data: {
                members,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const getMemberById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const member = await User.findOne({ _id: id, deletedAt: undefined });
        // const membership = await UserMembership.findOne({
        //     userId: member.id,
        //     status: true,
        // });

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Member is not exist, Id not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                member,
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

const updateProfileRules = () => {
    return [
        body('name')
            .optional()
            .isString()
            .withMessage('name must be a string')
            .trim()
            .escape(),

        body('dateOfBirth')
            .optional()
            .isDate()
            .withMessage('date is invalid!')
            .trim(),

        body('gender')
            .optional()
            .isString()
            .withMessage('gender must be a string')
            .isIn(['male', 'female'])
            .withMessage('invalid gender input, valid option male | female')
            .trim(),

        body('address')
            .optional()
            .isString()
            .withMessage('address must be a string')
            .trim(),
    ];
};

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id, deletedAt: undefined });

        const { name, dateOfBirth, gender, address } = req.body;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not eixst. Id not found',
            });
        }

        user.name = name != undefined ? name : user.name;
        user.dateOfBirth =
            dateOfBirth != undefined ? dateOfBirth : user.dateOfBirth;
        user.gender = gender != undefined ? gender : user.gender;
        user.address = address != undefined ? address : user.address;

        var isSuccess = await user.save();

        if (!isSuccess) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User profile has been updated',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            errors: error,
        });
    }
};

const updateMyProfile = (req, res, next) => {
    const user = req.user;
    updateProfile(req, res, user._id);
};

/*
This is for admin use
*/
const updateUserProfile = (req, res, next) => {
    const { id } = req.params;

    updateProfile(req, res, id);
};

module.exports = {
    getMyData,
    filterMemberRules,
    getAllMembers,
    getMemberById,
    updateProfileRules,
    updateMyProfile,
    updateUserProfile,
};
