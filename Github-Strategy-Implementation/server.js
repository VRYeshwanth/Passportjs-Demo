import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("login.ejs");
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
})