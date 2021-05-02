const express = require("express");
const excel = require("exceljs");
const app = express();

const PORT = process.env.PORT || 3000;

var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// app.use(bodyParser.json());
app.use(
  bodyParser.json({
    limit: "500mb",
    parameterLimit: 600000,
    extended: true,
  })
);

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  let output = 0;
  res.render("index", {
    output: output,
  });
});

app.post("/getNumber", function (req, res) {
  let source = req.body.source;
  let target = req.body.target;
  let incrementLower = req.body.incrementLower;
  let incremenetUpper = req.body.incremenetUpper;
  let notes = [];
  let sourceArray = [];
  sourceArray = source.split("\r\n");

  let targetArray = [];
  targetArray = target.split(",");

  let results = [],
    temp = [],
    didFind = false;

  //Pushing 0 to all the indexes
  for (let j = 0; j < sourceArray.length; j++) {
    results.push([sourceArray[j], 0]);
  }
  //i = incrememntValue
  //Going through all the increments
  for (
    let incrememntValue = incrementLower;
    incrememntValue <= incremenetUpper;
    incrememntValue++
  ) {
    console.log(`Increment ${incrememntValue}`);
    //Going through the source indexes
    for (let sourceIndex = 0; sourceIndex < sourceArray.length; sourceIndex++) {
      if (sourceArray[sourceIndex] == targetArray[0]) {
        for (
          let targetCounter = 0;
          targetCounter < targetArray.length;
          targetCounter++
        ) {
          if (
            sourceArray[sourceIndex + targetCounter * incrememntValue] ==
            targetArray[targetCounter]
          ) {
            didFind = true;
            //TO DO Adding the values to temp array
          } else {
            didFind = false;
            break;
          }
        }
        if (didFind) {
          //If Did Frind == true --> merge the temp values to results array.
          for (
            let targetCounter = 0;
            targetCounter < targetArray.length;
            targetCounter++
          ) {
            //1,000,002 --> Show why it is 1,000,002 -- It was 2 and it was 9
            //4th column - There was a skip of 2s and skip of 9. Target in this exmaple is 4 and 6
            console.table(results);

            if (
              results[sourceIndex + targetCounter * incrememntValue][1] != 0
            ) {
              notes.push(`Index ${sourceIndex} had: ${incrememntValue}`);
              if (
                results[sourceIndex + targetCounter * incrememntValue][1] <
                1000000
              ) {
                results[
                  sourceIndex + targetCounter * incrememntValue
                ][1] = 1000001;
              }

              if (
                results[sourceIndex + targetCounter * incrememntValue][1] >
                1000000
              ) {
                results[sourceIndex + targetCounter * incrememntValue][1] += 1;
              }
            } else {
              console.log(
                `Incr: ${incrememntValue} - Settting value to results[${
                  sourceIndex + targetCounter * incrememntValue
                }]`
              );
              results[
                sourceIndex + targetCounter * incrememntValue
              ][1] = incrememntValue;
            }

            // results[[j+(k*i)][0]] = sourceArray[j+(k*i)]
            // console.table("Line 92",results);
          }
          //Change the values for the corresponding items here
          didFind = false;
        }
      }
    }
  }

  notes.sort();
  console.table(notes);

  // console.log(resultsToDisplay);
  res.render("getNumber", {
    results: results,
    notes: notes,
  });
  // res.send({ results: results, notes });

  // const jsonResults = JSON.parse(JSON.stringify(results));

  // let workbook = new excel.Workbook();
  // let worksheet = workbook.addWorksheet("Results");
  // worksheet.columns = [
  //   { header: "Number", key: "testKey", width: 30 },
  //   { header: "Result", key: "resultTest", width: 30 },
  // ];
  // worksheet.addRows(jsonResults);
  // res.setHeader(
  //   "Content-Type",
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  // );
  // res.setHeader("Content-Disposition", `attachment; filename= customer.xlsx`);

  // return workbook.xlsx.write(res).then(function () {
  //   res.status(200).end();
  // });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
