const route = require("express").Router();
const {
    registerHandler,
    registerValidationRules,
    loginHandler,
    loginValidationRules
} = require("../controllers/authController")
const validate = require("../utils/validationRules")

route.post("/login", loginValidationRules(), validate, loginHandler)
route.post("/register",registerValidationRules(), validate, registerHandler);



module.exports = route;