const { User } = require("../model/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const db = new User();

const userMessage = "User already exists";
const emailUsedMessage = "Email is already used by an existing account.";
const emailMessage = "The email you entered seems to be in an invalid format";
const passwordMessage =
    "The password you entered seems to be in an invalid format, please check that it has atleast 10 characters and contains both numbers & letters";

const validateForm = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .custom(async value => {
            const user = await db.getUserByUsername(value);

            if (user) throw userMessage;
        }),
    body("email")
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage(emailMessage)
        .custom(async value => {
            const user = await db.getUserByEmail(value);

            if (user) throw emailUsedMessage;
        }),
    body("password").trim().notEmpty().withMessage("Password is required").isAlphanumeric().isLength({ min: 10 }).withMessage(passwordMessage),
    body("passwordConfirm")
        .trim()
        .notEmpty()
        .custom((value, { req }) => {
            return value == req.body.password;
        })
        .withMessage("The password does not match"),
];

function getSignUpForm(req, res) {
    res.render("signUp");
}

const addUser = [
    validateForm,
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(401).render("signUp", { errors: errors.array() });

        bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
            if (err) next(err);

            req.body.password = hashedPass;

            db.createUser(req.body);
            res.redirect("/");
        });
    },
];

module.exports = {
    getSignUpForm,
    addUser,
};
