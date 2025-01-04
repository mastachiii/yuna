const express = require("express");
const { PrismaClient } = require("@prisma/client");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("passport");
const passportConfig = require("./passport/passport");
require("dotenv").config();

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

app.get("/", (req, res) => res.send("<h1>Hello World</h1>"));

app.use((err, req, res, next) => {
    console.error(err);
    res.json(err);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
