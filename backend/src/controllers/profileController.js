const fs = require('fs');
const path = require('path');
const { body } = require('express-validator');
const User = require('../models/User');
const updateProfileRules = () => {
    return [
        body('name').optional().isString().withMessage('Name must be a string'),
        body('email')
            .optional()
            .isEmail()
            .withMessage('email is not valid')
            .normalizeEmail(),
        body('address').optional(),
        body('gender')
            .optional()
            .isIn(['male', 'female'])
            .withMessage('gender must be a male or female')
            .trim(),
        body('oldPassword').optional().isLength({ min: 6 }).trim(),
        body('newPassword').optional().isLength({ min: 6 }).trim(),
        body('dateOfBirth')
            .optional()
            .isDate()
            .withMessage('birth date is not valid'),
    ];
};

const getMyProfile = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id })
            .populate('memberDetail')
            .lean();
        return res.status(200).json({
            success: true,
            data: {
                profile: user,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

const updateProfileImage = async (req, res, next) => {
    try {
        const imageFile = req.file;
        if (imageFile == undefined) {
            return res.status(400).json({
                success: false,
                message: 'Image is empty',
            });
        }

        const user = req.user;
        user.image = imageFile.path;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'saved',
        });
    } catch (error) {
        if (error)
            return res.status(500).json({
                success: false,
                error: error.message,
            });
    }
};

const getProfileImage = (req, res, next) => {
    try {
        const user = req.user;
        const pathImage = path.join(process.cwd(), user.image);
        if (!fs.existsSync(pathImage)) {
            return res.status(404).json({
                success: false,
                message: 'Image not found',
            });
        }
        return res.sendFile(pathImage);
    } catch (error) {
        if (error)
            return res.status(500).json({
                success: false,
                error: error.message,
            });
    }
};

const updateMyProfile = async (req, res, next) => {
    try {
        const {
            name,
            email,
            address,
            gender,
            dateOfBirth,
            oldPassword,
            newPassword,
        } = req.body;
        const profile = req.user;

        if (name) profile.name = name;
        if (email) profile.email = email;
        if (address) profile.address = address;
        if (gender) profile.gender = gender;
        if (dateOfBirth) profile.dateOfBirth = new Date(dateOfBirth);
        if (oldPassword && newPassword) {
            const isMatch = await profile.comparePassword(oldPassword);
            if (isMatch) {
                profile.password = newPassword;
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Update profile failed. oldPassword is incorrect',
                });
            }
        }

        await profile.save();
        return res.status(200).json({
            success: true,
            message: 'Update profile success',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

module.exports = {
    getMyProfile,
    updateProfileImage,
    getProfileImage,
    updateMyProfile,
    updateProfileRules,
};
