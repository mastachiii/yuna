const express = require("express");
const controller = require("../controller/logInController");
const passport = require("passport");
const auth = require("../helpers/authMiddleware");

const router = express.Router();

router.get("/", auth.isNotAuthenticated, controller.getLogInForm);

router.post("/", passport.authenticate("local", { failureRedirect: "/log-in", failureMessage: true }), controller.logInUser);

module.exports = router;
