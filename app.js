const express = require("express");
const { PrismaClient } = require("@prisma/client");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("passport");
const passportConfig = require("./passport/passport");
const isAuthenticated = require("./helpers/authMiddleware");
require("dotenv").config();

// Routes
const signUp = require("./routes/signUpRoutes");
const logIn = require("./routes/logInRoutes");

const app = express();

app.set("view engine", "ejs");

// Middleware
app.use(
    session({
        cookie: {
            maxAge: 300000,
        },
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        store: new PrismaSessionStore(new PrismaClient(), {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
);
app.use(express.urlencoded({ extended: true }));
app.use("/sign-up", signUp);
app.use("/log-in", logIn);

// GET
app.get("/", (req, res) => res.send("<h1>Hello World</h1>"));

app.get("/secret", isAuthenticated, (req, res) => res.send("zuccess"));

// POST
app.post("/sign-up", (req, res) => console.log(req.body));

// Error Handling
app.use((err, req, res, next) => {
    console.error(err);
    res.json(err);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
