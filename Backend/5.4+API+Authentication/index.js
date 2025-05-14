import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "visheshjain003";
const yourPassword = "1234";
const yourAPIKey = "0d24ccff-82b6-4d9e-9544-2abad2138c32";
const yourBearerToken = "1e2f75d7-401d-402e-a670-49b31c0c4d37";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios.get('https://secrets-api.appbrewery.com/random');
    const result = response.data;
    res.render('index.ejs', { content: JSON.stringify(result) });
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});
app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  try {
    const response = await axios.get('https://secrets-api.appbrewery.com/all?page=2', {
      auth: {
      username: yourUsername, 
      password: yourPassword,
      }
    });
    const result = response.data;
    res.render('index.ejs', { content: JSON.stringify(result) });
  } catch(error) {
    res.status(500).send("Error fetching data");
  }
    
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

  try{
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter`, {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      }
    });
    const result = response.data;
    res.render('index.ejs', {content: JSON.stringify(result)});
  } catch(error){
    res.status(500).send("Error fetching data.");
  }

});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */

  try{
    const response = await axios.get('https://secrets-api.appbrewery.com/secrets/42',{
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      },
    });
    const result = response.data
    res.render('index.ejs', {content: JSON.stringify(result)});
  } catch(error){
    res.status(500).send("Error fetching data.");
  }

});

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
