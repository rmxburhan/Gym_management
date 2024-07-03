const route = require("express").Router();
const {
    getMyData,
    updateProfileRules, 
    updateMyProfile,
} = require("../controllers/userController")
const validate = require("../utils/validationRules")


route.get("/", getMyData);

route.put("/", updateProfileRules(), validate, updateMyProfile)

// route.post("/image", updateProfileImage);

module.exports = route;