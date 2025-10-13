import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import bcrypt from "bcrypt";
import { initialize } from "./config/passportConfig.js";
import { findUserByUsername, createUser } from "./models/UserModel.js";

dotenv.config();

const app = express();
initialize(passport);

app.use(express.urlencoded({extended: true}));

app.use(session(
    {
        secret: "my-secret-key",
        resave: false,
        saveUninitialized: false
    }
));
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.render("login.ejs", {error: null})
})
app.get("/register", (req, res) => {
    res.render("register.ejs", {error: null})
})
app.post("/register", async (req, res) => {
    const {username, password} = req.body;

    const existingUser = await findUserByUsername(username);
    if(existingUser)
        return res.render("register.ejs", {error: "User already exists !!"});

    const hashed = await bcrypt.hash(password, 10);
    await createUser(username, hashed);
    res.redirect("/");
});
app.post("/login", async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err)
            return next(err);
        if(!user)
            return res.render("login.ejs", {error: info.message});

        req.login(user, (err) => {
            if(err)
                return next(err);

            return res.redirect("/dashboard");
        });
    })(req, res, next);
});
app.get("/dashboard", isAuthenticated , (req, res) => {
    res.render("dashboard.ejs", {user: req.user.username});
})
app.get("/logout", (req, res, next) => {
    req.logout(err => {
        if(err)
            return next(err);
        res.redirect("/");
    });
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated())
        return next();
    res.redirect("/");
}

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})