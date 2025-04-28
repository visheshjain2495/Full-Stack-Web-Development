import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { message: "Enter your name below 👇" } );
});

// function userName(req, res, next){

// }

app.post("/submit", (req, res) => {
  res.render("index.ejs", { message : `Your Name has ${(req.body["fName"]+req.body["lName"]).length} letters.` })
});

app.listen(port, () => {
  console.log(`Server started on port ${port} go on http://localhost:${port}`);
});
