const express = require("express");
const controller = require("../controller/signUpController");
const auth = require("../helpers/authMiddleware");

const router = express.Router();

router.get("/", auth.isNotAuthenticated, controller.getSignUpForm);

router.post("/", controller.addUser);

module.exports = router;
