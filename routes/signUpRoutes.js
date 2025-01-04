const express = require("express");
const controller = require("../controller/signUpController");

const router = express.Router();

router.get("/", controller.getSignUpForm);

router.post("/", controller.addUser);

module.exports = router;
