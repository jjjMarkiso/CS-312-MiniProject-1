import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + "/public"));

let submissions = [];

app.get("/", (req, res) => {
    const today = new Date();
    const day = today.getDay();

    let type = "a weekday";
    let adv = "it's time to work hard"

    if (day === 0 || day === 6) {
        type = "the weekend";
        adv = "it's time to have some fun"
    }

    console.log(day);
    res.render("index.ejs", {
        dayType: type,
        advice: adv,
        submissions,
    });
});

app.post("/submit", (req, res) => {
    const text = req.body.text;
    submissions.push(text);
    res.redirect("/");
})

app.post("/delete", (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index)) {
        submissions.splice(index, 1);
    }
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});