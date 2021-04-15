const express = require("express");
const app = express();
const port = 3000;
let myInput = [1, 3];
let output = 0;

app.get("/", (req, res) => {
  for (let i = 0; i < myInput.length; i++) {
    output += myInput[i];
    console.log(output);
  }
  res.json(output);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
