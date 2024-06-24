const route =require("express").Router();

const authRoute = require("./authIndex");
const userRoute = require("./userRoute");

route.use("/auth", authRoute);
route.use("/users", userRoute);

module.exports = route;