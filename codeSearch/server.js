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

  res.render("index", { output: output });
});

app.get("/getNumber", function (req, res) {
  let source = req.query.source;
  let target = req.query.target;
  let incrementLower = req.query.incrementLower
  let incremenetUpper = req.query.incremenetUpper

  let sourceArray = [];
  sourceArray = source.split("\r\n");

  let targetArray = [];
  targetArray = target.split("\r\n");

  let results = []
  let myData = [];
  let didFind = false
  
  for(let i = incrementLower; i<=incremenetUpper; i++)
  {
    console.log(`Checking incrememnt ${i}`)
    for(let j = 0; j<sourceArray.length; j++)
    {
      console.log(`sourceArray[j]=> ${sourceArray[j]}`)
      if(sourceArray[j] == targetArray[0])
      {
        for(let k = 0; k<targetArray.length; k++)
        {
          console.log(`K ==> ${k}`)
          console.log(`J ==> ${j}`)

          console.log(`${sourceArray[j+(k*i)]} == ${targetArray[k]}`)
          if(sourceArray[j+(k*i)] == targetArray[k])
          {
            didFind= true
            console.log("did find setting true")
          }
          
          else {
            console.log("breaking loop")
            didFind = false
            break
          }
        }
        if(didFind)
        {
          //Change the values for the corresponding items here
        }
      }
    }
  }
 

  res.render("getNumber", { myData: didFind });
  // res.send("Number: " + myData);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
