const express = require("express");
const controller = require("../controller/logInController");

const router = express.Router();

router.get("/", controller.getLogInForm);

router.post("/");

module.exports = router
