const express = require("express");
const { PrismaClient } = require("@prisma/client");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("passport");
const passportConfig = require("./passport/passport");
const auth = require("./helpers/authMiddleware");
require("dotenv").config();

// Routes
const signUp = require("./routes/signUpRoutes");
const logIn = require("./routes/logInRoutes");
const folders = require("./routes/folderRoutes");
const files = require("./routes/fileRoutes");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`))

// Middleware
app.use(
    session({
        cookie: {
            maxAge: 20 * 60 * 1000000,
        },
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        store: new PrismaSessionStore(new PrismaClient(), {
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(passport.authenticate("session"));
app.use("/sign-up", signUp);
app.use("/log-in", logIn);
app.use("/folders", folders);
app.use("/files", files);

// GET
app.get("/", auth.isAuthenticated, (req, res) => res.redirect(`/folders/${req.user.rootFolder.id}`));

app.get("/secret", auth.isAuthenticated, (req, res) => res.send("zuccess"));

// POST
app.get("/log-out", auth.isAuthenticated, (req, res) => {
    req.logout(err => {
        if (err) next(err);

        res.redirect("/");
    });
});

// Error Handling
app.use((err, req, res, next) => {
    console.log(err);
    res.render('error');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
