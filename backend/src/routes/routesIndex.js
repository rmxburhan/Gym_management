const route =require("express").Router();
const authRoute = require("./authIndex");
const userRoute = require("./userRoute");
const profileRoute = require("./profileRoute");
const authorize = require("../middleware/authorizationMiddleware");

route.use("/auth", authRoute);
route.use("/profile", authorize,  profileRoute);
route.use("/users", userRoute);

module.exports = route;