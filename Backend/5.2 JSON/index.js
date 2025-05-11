import express from "express";
import bodyParser from "body-parser";
import fs from 'fs';

const app = express();
const port = 3000;

//Step 1: Run the solution.js file without looking at the code.
//Step 2: You can go to the recipe.json file to see the full structure of the recipeJSON below.
const recipeJSON = JSON.parse(fs.readFileSync("recipe.json", "utf-8"));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/recipe", (req, res) => {
  //Step 3: Write your code here to make this behave like the solution website.
  if (req.body.choice === "chicken"){
    res.render("index.ejs",{recipe : recipeJSON[0]});
  }
  else if (req.body.choice === "beef"){
    res.render("index.ejs",{recipe : recipeJSON[1]});
  }
  else if (req.body.choice === "fish"){
    res.render("index.ejs",{recipe : recipeJSON[2]});
  }
  //Step 4: Add code to views/index.ejs to use the recieved recipe object.
});

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});
