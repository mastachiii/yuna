const { User } = require("../model/queries");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = new User();

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.getUserByUsername(username);
            if (!user) return done(null, false, { message: "Incorrect Username or Password" });

            const match = await bcrypt.compare(password, user.password);
            if (!match) return done(null, false, { message: "Incorrect Username or Password" });

            return done(null, user);
        } catch (err) {
            done(err);
        }
    })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);

        console.log(user)

        done(null, user);
    } catch (err) {
        done(err);
    }
});
