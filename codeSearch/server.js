const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  let output = 0;

  res.render("index", { output: output });
});

app.post("/getNumber", function (req, res) {
  let source = req.body.source;
  let target = req.body.target;
  let incrementLower = req.body.incrementLower
  let incremenetUpper = req.body.incremenetUpper

  let sourceArray = [];
  console.log(source)
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
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
