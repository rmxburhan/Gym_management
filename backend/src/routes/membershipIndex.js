const route = require("express").Router();
const {
addMemberValidationRules,
addMembershipHandler
} = require("../controllers/membershipController")
const validate = require("../utils/validationRules")

route.get("/", function () {})

route.post("/", addMemberValidationRules(), validate, addMembershipHandler);

module.exports = route;