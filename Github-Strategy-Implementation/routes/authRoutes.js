import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/github", passport.authenticate("github", {scope: ["user:email"]}));

router.get("/github/callback", 
    passport.authenticate("github", {failureRedirect: "/"}),
    (req, res) => {
        res.redirect("/auth/dashboard");
    }
);

router.get("/dashboard", isAuthenticated, (req, res) => {
    res.render("dashboard.ejs", {user: req.user.username});
})

router.get("/logout", (req, res, next) => {
    req.logout(err => {
        if(err) return next(err);
        res.redirect("/");
    });
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect("/");
}

export default router;