import express from "express";

const app = express();
const port = 3000;

const d = new Date();
let dayNum = d.getDay();

let day = "Weekday";
let suggestion = "work hard";

if (dayNum === 0 || dayNum === 6){
    day = "Weekend";
    suggestion = "party hard";
}

app.get("/", (req, res)=>{
    res.render("index.ejs", {
        day,
        suggestion
    })
});

app.listen(port, () => {
    console.log(`Server started on port ${port} go on http://localhost:${port}`);
});