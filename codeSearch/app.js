const express = require("express");
const app = express();
const port = 3000;
let myInput = [1, 3];
const posts = [
  {
    id: 1,
    author: "John",
    title: "Templating with EJS",
    body: "Blog post number 1",
  },
  {
    id: 2,
    author: "Drake",
    title: "Express: Starting from the Bottom",
    body: "Blog post number 2",
  },
  {
    id: 3,
    author: "Emma",
    title: "Streams",
    body: "Blog post number 3",
  },
  {
    id: 4,
    author: "Cody",
    title: "Events",
    body: "Blog post number 4",
  },
];
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let output = 0;

  for (let i = 0; i < myInput.length; i++) {
    output += myInput[i];
    console.log(output);
  }
  //   res.json(output);
  res.render("home", { output: output });
});

app.get("/getNumber", function (req, res) {
  let number = req.query.number;
  number = number * number;
  res.send("Number: " + number);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
