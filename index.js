const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/details", (req, res) => {
  res.send("Hello Shayaan here");
});

app.listen(7777, () => {
  console.log("Active on port 7777");
});
