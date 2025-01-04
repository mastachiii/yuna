const express = require("express");
const controller = require("../controller/signUpController");

const router = express.Router();

router.get("/", controller.getSignUpForm);

module.exports = router;
