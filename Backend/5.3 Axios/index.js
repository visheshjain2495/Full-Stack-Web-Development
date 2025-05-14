import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`
    );
    const result = response.data;
    res.render("index.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
  } catch (error) {
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});
