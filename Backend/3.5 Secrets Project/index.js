//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var password = "";

app.use(bodyParser.urlencoded({extended : true}));

function passGetter(req, res, next){
    password = req.body["password"];
    next();
}

app.use(passGetter);

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/check", (req, res)=>{
    if (password === "ILoveProgramming") {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port} go on http://localhost:${port}`);
});