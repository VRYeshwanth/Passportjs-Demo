import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("login.ejs", {error: null})
})
app.get("/register", (req, res) => {
    res.render("register.ejs", {error: null})
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})