const request = require("request-promise-native");
const express = require("express");
const path = require('path');
const chalk = require("chalk");

const app = express();
const PORT = 3030;

const SWAPI_ORIGIN = "https://swapi.co";

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const requestMaker = (req, res) => {
  const { originalUrl } = req;

  request(SWAPI_ORIGIN + originalUrl)
    .then(body => {
      console.log("data sent successfuly")
      res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
      });
      res.send(body);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

app.get("/api", (req, res) => {
  requestMaker(req, res);
});

app.get("/api/:category", (req, res) => {
  requestMaker(req, res);
});

app.get("/api/:category/:id", (req, res) => {
  requestMaker(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is listerning ${chalk.cyan("http://localhost:" + PORT)}`);
});
