const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
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

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  let output = 0;

  for (let i = 0; i < myInput.length; i++) {
    output += myInput[i];
    console.log(output);
  }
  //   res.json(output);
  res.render("index", { output: output });
});

app.get("/getNumber", function (req, res) {
  let number = req.query.number;
  let myArray = [];
  myArray = number.split("\r\n");

  let myData = [];
  myArray.forEach((element) => {
    myData.push([element, 0]);
  });

  console.table(myData);

  res.render("getNumber", { myData: myData });
  // res.send("Number: " + myData);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
