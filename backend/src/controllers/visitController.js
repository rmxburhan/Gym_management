const {body, validationResult} = require('express-validator')
const MemberLog = require("../models/MemberLog")
const User = require("../models/User")

const visitValidationRules = () => {
    return [
        body("code").exists().withMessage("code is required").isString().withMessage("code mus be a string, you can get the code in front desk.").trim().escape()
    ]
}

const checkInHandler = (req, res, next) => {
    const {
        code
    } = req.body;
    const user = req.user;

}

// TODO : appliy filter in getAllVisits
const getAllVisitsHandler =  async (req,res, next) => {
    try {
        const datas = await MemberLog.find();

        const totalMemberVisit = ""

        return res.status(200).json({
            success: true,
            data : {
                memberLog : datas
            }
        })        
    } catch (error) {
        return res.status(500).json({
            success : false,
            error
        })
    }
}

module.exports = {
    checkInHandler,
    getAllVisitsHandler,
    visitValidationRules
}