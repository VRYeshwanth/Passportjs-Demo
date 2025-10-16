import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import passport from "passport";
import session from "express-session";
import { initialize } from "./config/passportConfig.js";

dotenv.config();

const app = express();
initialize(passport);
app.use(express.urlencoded({extended: true}));

app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 day in milliseconds
        }
    }
));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/auth/dashboard");
    }
    res.render("login.ejs");
});


app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
})