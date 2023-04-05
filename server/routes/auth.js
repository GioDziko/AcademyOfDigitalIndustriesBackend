const express = require("express");
const { logInController, registerController } = require("../controllers/auth");

const Router = express.Router();

Router.route("/login").post(logInController);
Router.route("/register").post(registerController);

module.exports = { Router };
