const User = require('../models/User');
const EmployeeDetail = require('../models/EmployeeDetail');
const { body } = require('express-validator');
const fs = require('fs');
const path = require('path');
const addEmployeeValidationRules = () => {
    return [
        body('name')
            .exists()
            .withMessage('name cannot be empty')
            .isString()
            .withMessage('name must be a string'),

        body('email')
            .exists()
            .withMessage('email cannot be empty')
            .isEmail()
            .withMessage('Please input the valid email')
            .normalizeEmail(),

        body('password')
            .exists()
            .withMessage('Password cannot be empty')
            .isString()
            .withMessage('Password must be a string')
            .isLength({ min: 6 })
            .trim(),

        body('gender')
            .exists()
            .withMessage('Gender cannot be empty')
            .isString()
            .withMessage('Gender must be a string')
            .isIn(['male', 'female'])
            .withMessage('Please input valid gender between male and female')
            .trim(),

        body('dateOfBirth')
            .exists()
            .withMessage('Date of birth cannot be empty')
            .isDate()
            .withMessage('Date is invalid'),

        body('address')
            .exists()
            .withMessage('Address  cannot be empty')
            .isString()
            .withMessage('Address cannot be empty'),

        body('employeeType')
            .exists()
            .withMessage('Employee type cannot be empty')
            .isIn(['trainer', 'staff'])
            .withMessage('Employee type can only contain trainer and staff'),
    ];
};

const updateEmployeeValidationRules = () => {
    return [
        body('name').optional().isString().withMessage('name must be a string'),

        body('email')
            .optional()
            .isEmail()
            .withMessage('Please input the valid email')
            .normalizeEmail(),

        body('password')
            .optional()
            .isString()
            .withMessage('Password must be a string')
            .isLength({ min: 6 })
            .trim(),

        body('gender')
            .optional()
            .isString()
            .withMessage('Gender must be a string')
            .isIn(['male', 'female'])
            .withMessage('Please input valid gender between male and female')
            .trim(),

        body('dateOfBirth').optional().isDate().withMessage('Date is invalid'),

        body('address')
            .optional()
            .isString()
            .withMessage('Address cannot be empty'),

        body('employeeType')
            .optional()
            .isIn(['trainer', 'staff'])
            .withMessage('Employee type can only contain trainer and staff'),
    ];
};

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            dateOfBirth,
            gender,
            image,
            address,
            employeeType,
        } = req.body;

        const userExist = await User.findOne({ email, deletedAt: undefined });
        if (userExist) {
            return res.status(400).json({
                success: 'false',
                message: 'User already exist',
            });
        }

        if (image != undefined) {
            // save image
        }

        const user = new User({
            name,
            email,
            password,
            dateOfBirth,
            gender,
            address,
            role: 'employee',
        });

        await user.save();

        const employeeDetail = new EmployeeDetail({
            employeeId: user._id,
            status: 'active',
            employeeType,
        });

        const success = await employeeDetail.save();

        if (!success) {
            await user.delete();

            return res.status(400).json({
                success: false,
                message: 'update employee success',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Employee has been saved!',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, password, dateOfBirth, gender, address, employeeRole } =
            req.body;

        const employee = await User.findOne({ _id: id, deletedAt: undefined });
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        if (name != undefined) employee.name = name;
        if (password != undefined) employee.password = password;
        if (dateOfBirth != undefined) employee.dateOfBirth = dateOfBirth;
        if (gender != undefined) employee.gender = gender;
        if (address != undefined) employee.address = address;
        if (employeeRole != undefined) employee.role = employeeRole;

        if (req.file != undefined) {
            if (fs.existsSync(path.join(pathprocess.cwd(), employee.image))) {
                fs.unlink(path.join(process.cwd(), employee.image));
            }
            employee.image = req.file.path;
        }

        await employee.save();

        return res.status(200).json({
            success: true,
            message: 'Employee has been updated',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const getDetailEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { employeeType } = req.body;

        const employee = await User.findOne({
            _id: id,
            deletedAt: undefined,
        })
            .populate('employeeDetail')
            .lean();

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Get employee failed, Id not found',
            });
        }

        // TODO : get detailed like attendances, graph data
        return res.status(200).json({
            success: true,
            data: {
                employee: employee,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const employees = await User.find({
            role: 'employee',
            deletedAt: undefined,
        });

        return res.status(200).json({
            success: true,
            data: {
                employees,
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
    addEmployee,
    updateEmployee,
    getDetailEmployee,
    getAllEmployees,
    addEmployeeValidationRules,
    updateEmployeeValidationRules,
};
