
const Membership = require("../models/Membership")
const {
    body
} = require("express-validator")

const addMemberValidationRules = () => {
    return [
        body("name").exists().withMessage("name cannot be empty").isString("name must be a string").trim().escape(),
        body("description").exists().withMessage("description cannot be empty"),
        body("duration").exists().withMessage("duration cannot be empty").isInt().withMessage("duration must be an int, day format")
    ]
}

const addMembershipHandler = async (req, res, next) => {
    const {
        name,
        description,
        duration
    } = req.body;

    const membership =new Membership({
        name,
        description,
        duration
    })

    const isSuccess = await membership.save();

    if (!isSuccess) {
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }

    return res.status(200).json({
        success : true,
        data : {
            membership
        }
    })
}

module.exports = {
    addMembershipHandler,
    addMemberValidationRules
}