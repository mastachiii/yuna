const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("passport");
const passportConfig = require("./passport/passport");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("<h1>Hello World</h1>"));

app.use((err, req, res, next) => {
    console.error(err);
    res.json(err);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
