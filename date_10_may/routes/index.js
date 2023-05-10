const express = require("express");
const routes = express.Router();
const unAuthroutes = require("./unauth/index");
const authroutes = require("./auth/index");
const verify = require("../middileware/verify");
routes.use("/api", unAuthroutes);
routes.use("/api/auth", verify, authroutes);

module.exports = routes;
