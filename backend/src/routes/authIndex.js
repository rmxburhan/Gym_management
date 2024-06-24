const route = require("express").Router();
const {
    registerHandler,
    registerValidationRules,
    loginHandler,
    loginValidationRules,
    validate
} = require("../controllers/authController")

route.post("/login", loginValidationRules(), validate, loginHandler)
route.post("/register",registerValidationRules(), validate, registerHandler);



module.exports = route;