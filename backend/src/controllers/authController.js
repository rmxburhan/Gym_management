const User = require("../models/User");
const {body, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")

const loginValidationRules = ()=> {
return [
    body("email").exists().withMessage("email cannot be empty").isString().withMessage("email must be a string").isEmail().withMessage("email is invalid").normalizeEmail(),
    body("password").exists().withMessage("password cannot be empty").isString().withMessage("password must be a string").isLength({min : 6}).withMessage("password minimal must contain 6 characters").trim()
]
}

const loginHandler = async (req, res)  => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({email : email});
        let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn : '1h'
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message : "Email is not registered!"
            })
        }

        var isMatch = user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success : false, 
                message : "Password is incorrect!"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Login successfull",
            data : {
                token,
                user
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            errors : error
        })
    }
    const {username, password} = req.body; 
}

const registerValidationRules = () => {
    return [
        body("name").exists().withMessage("name cannot be empty").isString().withMessage("name must be a string").trim().escape(),
        body("email").exists().withMessage("email cannot be empty").isEmail().withMessage("please input valid email").normalizeEmail(),
        body("password").exists().withMessage("password cannot be empty").isString().withMessage("password must be a string").isLength({min : 6}).withMessage("password must be contain 6 characters").trim(),
        body("dateOfBirth").exists().withMessage("date of birth cannot be empty").isDate().withMessage("date is invalid!").trim(),
        body("gender").exists().withMessage("gender cannot be empty").isString().withMessage("gender must be a string").isIn(['male', 'female']).withMessage("invalid gender input, valid option male | female").trim()
    ]
}


const registerHandler = async (req,res )=> {
    try {
        const {
            name, 
            email,
            password,
            dateOfBirth,
            gender
        } = req.body
    
        const isExist = await User.findOne({email : email});
        if (isExist) {
            console.log(isExist);
            return res.status(409).json({
                success :false,
                message : "email already exist"
            })
        }
    
        const user = new User({
            name ,
            email,
            password,
            dateOfBirth,
            gender
        });
    
        await user.save();
    
        // if (!isSuccess) {
        //     return res.status(500).json({
        //         success : false,
        //         message : "failed to add user data"
        //     })
        // }

        return res.status(201).json({
            success : true,
            message : "Register success!",
            data : {
                user
            }
        })
    } catch (error) {
        if (error) {
            return res.status(500).json({
                success : false,
                error
            })
        }
    }
}

module.exports =  {
    registerHandler,
    registerValidationRules,
    loginHandler,
    loginValidationRules
}