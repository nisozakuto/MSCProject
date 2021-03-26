//https://www.geeksforgeeks.org/how-to-show-page-loading-div-until-the-page-has-finished-loading/
const userscolors = document.getElementById("userscolors");
const getColorsFromStorageButton = document.getElementById(
  "getColorsFromStorage"
);
const createImagesButton = document.getElementById("roll");
const inverseCheckbox = document.getElementById("checkbox");
const invertCheckbox = document.getElementById("checkboxForInvert");
const zeroStatus = document.getElementById("isCountingZeros");
const rangeSelection = document.getElementById("rangeSelection");
const textArea = document.querySelector("textarea");
const singleColor = document.getElementById("singleColor");
const rangeColor = document.getElementById("rangeOfColor");
const statusText = document.getElementById("statusText");
const colorPrefSaveInput = document.getElementById("colorPrefInput");

let colors = [],
  myCodeArray = [],
  colorNames = [],
  missingColors = [],
  stringColorCheck = [],
  myColors = {},
  myString = "niso",
  pixelSize = 1, //DONT CHANGE THIS VALUE
  canvasWidth = 100, //DONT CHANGE THIS VALUE
  canvasHeigth = 100, //DONT CHANGE THIS VALUE
  startWidth = document.getElementById("startWidth"),
  endWidth = document.getElementById("endWidth"),
  setWidthText = document.getElementById("setWidthText"),
  imageNumberForThePage = 1,
  canIAddTheRange = true,
  canIAddThisSingle = true,
  countstartWidthValue,
  isPassedRange = false,
  isThereString = false,
  isSavedColorsLoaded = false,
  isWidthSet = false,
  isInverse = false,
  isInvert = false,
  isThereMissingColor = false,
  iAmDone = true,
  isCountingZeros = false,
  endWidthValue,
  code,
  amountOfZeros,
  mycanvas,
  currentColorSet,
  imageHeight;

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};

function clearYourColorsDOM() {
  document.getElementById("userscolors").innerText = "";
  iAmDone = true;
  if (document.getElementById("iAmDoneButton")) {
    document.getElementById("iAmDoneButton").disabled = false;
  }
  imageNumberForThePage = 1; //Load the selected image
}

function emtpyColors() {
  colors = [];
}

function missingColorFunction() {
  missingColors = [];
  for (number of stringColorCheck) {
    if (colors[number] == null) {
      if (!missingColors.includes(number) && number.length > 0) {
        missingColors.push(number);
      }
      isThereMissingColor = true;
    }
  }
  if (missingColors.length == 0) isThereMissingColor = false;
}

function clearResults() {
  alert("Clearing the results");
  document.getElementsByClassName("imagePrint")[0].innerHTML = "";
  emtpyColors();
  if (document.getElementById("downloadButtons").innerHTML != undefined)
    document.getElementById("downloadButtons").innerHTML = "";
  clearYourColorsDOM();
  statusText = "";
}

function addColor(number1, hex, number2) {
  if (number2 == undefined) {
    console.log("Adding only one color", number1); // Adding only one color
    number1 = parseInt(number1, 10);
    if (!colors[number1] || colors[number1] != null) {
      colors[number1] = hex;
      return;
    } else {
      alert("this exists");
      canIAddThisSingle = false;
      return;
    }
  } else if (number2) {
    canIAddTheRange = true;
    console.log("Adding a range of colors"); // Adding a range of colors
    for (let i = number1; i <= number2; i++) {
      console.log("Adding: ", i);
      colors[number1] = hex;
    }
  }
}

function createColorDiv(colorPickerValue, definedColor) {
  const colorDiv = document.createElement("div");
  colorDiv.style.backgroundColor = colorPickerValue;
  colorDiv.style.width = "20px";
  colorDiv.style.height = "20px";
  definedColor.append(colorDiv);
}

function createDeleteButton(definedColor) {
  deleteButton = document.createElement("button");
  deleteButton.style.width = "20px";
  deleteButton.style.height = "20px";
  deleteButton.innerText = "X";
  deleteButton.id = "xButton";
  definedColor.append(deleteButton);
}

function deleteButtonFunctionsToCall(definedColor) {
  colorPrefSaveButton();
  definedColor.remove();
  zeroCheck();
  missingColorFunction();
}

function createDOMForTheColor(number1, colorPickerValue, number2) {
  //CHANGE myString in the future
  console.log("Created via createDOMForTheColor");
  const definedColor = document.createElement("div");
  definedColor.id = myString;
  userscolors.append(definedColor);

  const myColorNamelabel = document.createElement("p");
  myColorNamelabel.innerText = "Color HEX is:";
  definedColor.append(myColorNamelabel);

  if (singleColor.checked == true) {
    myColorNamelabel.innerText +=
      " " + colorPickerValue + " and the color: " + number1;
  }

  if (rangeColor.checked == true) {
    myColorNamelabel.innerText += ` ${colorPickerValue} and the color: ${number1} to ${number2}`;
  }

  createColorDiv(colorPickerValue, definedColor);
  createDeleteButton(definedColor);

  deleteButton.addEventListener("click", () => {
    if (singleColor.checked == true) {
      delete colors[number1];
      delete `colors_${document.getElementById("colorPrefs").value}`[number1];
      deleteButtonFunctionsToCall(definedColor);
    }
    if (rangeColor.checked == true) {
      for (let index = number1; index <= number2; index++) {
        delete colors[index];
        delete `colors_${document.getElementById("colorPrefs").value}`[index];
        deleteButtonFunctionsToCall(definedColor);
      }
    }
  });
}

function zeroCheck() {
  console.log("Zero Check");
  if (colors[0] == undefined) {
    isCountingZeros = false;
    zeroStatus.innerText = `Removing 0s from the list`;
  } else {
    isCountingZeros = true;
    zeroStatus.innerText = `Keeping 0s in the list`;
  }
  breakString();
}

// ADD A COLOR
function addASingleColor() {
  console.log("========== Adding a color ==========");
  let chosenColorNumber = parseInt(
    document.getElementById("colorNumber1").value,
    10
  );
  if (canIAddThisSingle && !colors[chosenColorNumber]) {
    // addingTheColor(chosenColorNumber, colorPicker.value);
    addColor(chosenColorNumber, colorPicker.value);
    createDOMForTheColor(chosenColorNumber, colorPicker.value);
  } else {
    alert("This color is already in your list");
  }
} // ADD A COLOR FINISHED

function add() {
  if (singleColor.checked) {
    addASingleColor();
  } else if (rangeColor.checked) {
    canIAddTheRange = true;
    let firstNumber = parseInt(
      document.getElementById("colorNumber1").value,
      10
    );
    let secondNumber = parseInt(
      document.getElementById("colorNumber2").value,
      10
    );
    if (firstNumber >= secondNumber) {
      alert("Second number must be bigger than the first one");
    } else if (secondNumber > firstNumber) {
      console.log(`Lets add this range ${secondNumber} to ${firstNumber}`);
      for (let i = firstNumber; i <= secondNumber; i++) {
        if (colors[i] != undefined) {
          alert(`${i} is already added to your colors`);
          canIAddTheRange = false;
          return;
        }
      }

      if (canIAddTheRange) {
        for (let i = firstNumber; i <= secondNumber; i++) {
          addColor(i, colorPicker.value);
        }
        createDOMForTheColor(firstNumber, colorPicker.value, secondNumber);
      }
    }
  }
  zeroCheck();
  missingColorFunction();
}

function breakString() {
  amountOfZeros = 0;
  code = document.getElementById("string").value;
  myCodeArray = code.split(/\n/);

  if (!isCountingZeros) {
    for (var i = 0; i < myCodeArray.length; i++) {
      if (myCodeArray[i] === "0") {
        amountOfZeros++;
        myCodeArray.splice(i, 1);
        i--;
      }
    }
  }
  setStringLengthText(myCodeArray.length);
}

function calcImageHeight(stringLength, rowLength) {
  imageHeight = Math.ceil(stringLength / rowLength);
  return imageHeight;
}

function isColorInvert(ctx) {
  if (isInvert) {
    ctx.filter = "invert(1)";
  }
}

const createPicture = async (rowLength) => {
  // const createPicture = async (rowLength) => {
  calcImageHeight(myCodeArray.length, rowLength);
  let canvasNumberh2 = document.createElement("h2");
  canvasNumberh2.innerText = `Image number: ${imageNumberForThePage} & Width is: ${rowLength} & Height is: ${imageHeight}`;
  canvasNumberh2.id = "canvasH2";

  let canvas = document.createElement("canvas");

  canvas.width = rowLength;
  canvas.height = imageHeight;

  let line, column;

  if (isInverse) {
    (line = 0), (column = rowLength);

    canvas.style.border = "1px solid black";
    var ctx = canvas.getContext("2d");
    isColorInvert(ctx);
    // ADDING PIXELS
    for (let i = 0; i < myCodeArray.length; i++) {
      column -= pixelSize;
      ctx.fillStyle = colors[myCodeArray[i]];
      ctx.fillRect(column, line, pixelSize, pixelSize);
      if (column <= 0) {
        line += pixelSize;
        column = rowLength;
      }
    }
  } else {
    column = line = 0;
    canvas.style.border = "1px solid black";
    var ctx = canvas.getContext("2d");
    isColorInvert(ctx);
    //ADDING PIXELS
    for (let i = 0; i < myCodeArray.length; i++) {
      ctx.fillStyle = colors[myCodeArray[i]];
      ctx.fillRect(column, line, pixelSize, pixelSize);
      column += pixelSize;

      if (i >= rowLength && i % rowLength == 0) {
        line += pixelSize;
        column = 0;
      }
    }
  }

  //These two lines are same for both inverse and normal
  const imagePrint = document.getElementsByClassName("imagePrint");
  imagePrint[0].append(canvasNumberh2);
  imagePrint[0].append(canvas);
  document.querySelector("#loader").style.display = "none";
  document.querySelector("body").style.visibility = "visible";
};

function downloadFunction(index, startWidthValueForDownload) {
  getMyCanvasFunction();
  calcImageHeight(myCodeArray.length, startWidthValueForDownload);
  var downloadUrl = mycanvas[index].toDataURL("image/png");
  var a = document.createElement("a");
  a.href = downloadUrl;
  a.target = "_parent";
  if ("download" in a) {
    a.download = `File_${index + 1}_Width:${
      mycanvas[index].width
    }_Height_${imageHeight}`;
  }
  (document.body || document.documentElement).appendChild(a);
  if (a.click) {
    a.click(); // The click method is supported by most browsers.
  }
  a.parentNode.removeChild(a);
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function checkIsThereString() {
  if (myCodeArray.length >= 0) {
    isThereString = true;
  }
  if (myCodeArray.length == 1 && myCodeArray[0] == "") {
    isThereString = false;
  }
}
function getMyCanvasFunction() {
  mycanvas = document.querySelectorAll("canvas");
}

// const roll = async () => {
function roll() {
  //Create a function to check the missing number 1)When string changes 2)When a color is added --> Adjust the isThereMissingColor variable
  checkIsThereString();

  if (isThereMissingColor) {
    let missingColorsString = "";
    for (missing of missingColors) {
      console.log(missing);
      missingColorsString += missing + ", ";
      console.log(missingColorsString);
    }
    missingColorsString = missingColorsString.slice(
      0,
      missingColorsString.length - 1
    );
    alert(
      `Missing colors are: ${missingColorsString.slice(
        0,
        missingColorsString.length - 1
      )}`
    );
    return;
  }
  if (!isPassedRange) {
    alert("Set the range");
  } else if (!isThereString) {
    alert("There is no string");
  } else if (isPassedRange && isThereString) {
    zeroCheck();

    //Create pictures
    // for (let index = startWidthValue; index <= endWidthValue; index++) {
    //   createPicture(index);
    //   imageNumberForThePage++;
    //   if (index < endWidthValue)
    //     statusText.innerText = `Drawing pictures. Currently at ${index}`;
    //   else statusText.innerText = `Finished`;
    // }

    nonBlockingIncrement(endWidthValue, function (currentI, done) {
      if (done) {
        console.log("0 incremented to " + currentI);
        statusText.innerText = `Finished`;
      }
    });

    //define the slow function; this would normally be a server call
    function nonBlockingIncrement(n, callback) {
      var index = startWidthValue;
      function loop() {
        console.log(index);
        createPicture(index);
        statusText.innerText = `Drawing pictures. Currently at ${index}`;
        if (index < n) {
          index++;
          callback(index, false);
          (window.requestAnimationFrame || window.setTimeout)(loop);
        } else {
          callback(index, true);
        }
      }
      loop();
    }

    //Start creating download links
    let resultAmount = endWidthValue - startWidthValue;
    let startWidthValueForDownload = startWidthValue;

    if (!document.getElementById("iAmDoneButton")) {
      const iAmDoneButton = document.createElement("button");
      iAmDoneButton.innerText = "Create Links";
      iAmDoneButton.id = "iAmDoneButton";
      let mainButtons = document.getElementById("mainButtons");

      iAmDoneButton.addEventListener("click", () => {
        if (iAmDone) {
          getMyCanvasFunction();
          if (resultAmount == 0) resultAmount = 1;
          for (let i = 0; i < resultAmount; i = i + 10) {
            let downloadButton = document.createElement("button");
            document.getElementById("downloadButtons").append(downloadButton);
            downloadButton.innerText = `Download ${i + 1} to ${i + 10}`;
            downloadButton.addEventListener("click", () => {
              let index = i;
              for (index; index < i + 10; index++) {
                downloadFunction(index, startWidthValueForDownload);
                startWidthValueForDownload++;
              }
              downloadButton.disabled = true;
            });
          }
          document.getElementById("iAmDoneButton").disabled = true; //Set the width to default:
        }
      });
      mainButtons.appendChild(iAmDoneButton);
    }
  } else {
    alert("Speak with the developer");
  }
}

const tryme = async () => {
  getMyCanvasFunction();
  let startWidthValueForDownload = startWidthValue;

  for (let index = 0; index < mycanvas.length; index++) {
    await sleep(400);
    downloadFunction(index, startWidthValueForDownload);
    startWidthValueForDownload++;
  }
};

function save() {
  let result = confirm("Are you sure you want to save?");
  if (result) {
    if (colors.length == 0) alert("Please first add colors");
    else localStorage.setItem("colors", JSON.stringify(colors));
  } else {
  }
}

function getColorsFunction(number) {
  myColors = {};
  isSavedColorsLoaded = true;
  clearYourColorsDOM();

  if (localStorage.getItem(`colors_${number}`) == null) {
    colors.length = 0;
  } else {
    colors = localStorage.getItem(`colors_${number}`);
    colors = JSON.parse(colors);
  }

  colors.map((e, i) => {
    if (myColors[colors[i]]) {
      myColors[colors[i]].push(i);
    } else {
      myColors[colors[i]] = [];
      myColors[colors[i]].push(i);
    }
  });

  for (let [key, value] of Object.entries(myColors)) {
    if (key != "null") {
      const definedColor = document.createElement("div");
      definedColor.id = myString;
      userscolors.append(definedColor);

      const myColorNamelabel = document.createElement("p");
      myColorNamelabel.innerText = "Color HEX is:";
      definedColor.append(myColorNamelabel);

      myColorNamelabel.innerText += " " + key + " and the color: ";
      myColors[key].map((e, i) => {
        myColorNamelabel.innerText += ` ${e}`;
      });

      let colorPickerValue = key;

      createColorDiv(colorPickerValue, definedColor);
      createDeleteButton(definedColor);

      deleteButton.addEventListener("click", () => {
        myColors[key].map((e) => {
          console.log(e);
          colors[e] = null;
        });
        deleteButtonFunctionsToCall(definedColor);
      });
    }
  }
}

function getColorsFromStorage() {
  let result = true;
  if (colors.length > 0) {
    result = confirm("Do you want to overwrite your current colors?");
  }
  if (result && !isSavedColorsLoaded) {
    getColorsFunction();
  } else {
    //DONT DO ANYTHING
  }
  if (isSavedColorsLoaded) {
    getColorsFromStorageButton.disabled = true;
  }
}

//RADIO BUTTONS START
singleColor.addEventListener("click", () => {
  if ((rangeColor.checked = true)) {
    rangeColor.checked = false;
  }
  document.getElementById("colorNumber2").disabled = true;
});

rangeColor.addEventListener("click", () => {
  if ((singleColor.checked = true)) {
    singleColor.checked = false;
  }
  document.getElementById("colorNumber2").disabled = false;
}); //RADIO BUTTONS END

// RANGE SET
function setRangeWidth() {
  startWidthValue = parseInt(startWidth.value, 10);
  if (rangeSelection.checked) {
    setWidthText.innerText = `Set width is ${startWidthValue}`;
    endWidthValue = startWidthValue;
    isWidthSet = true;
    createImagesButton.disabled = false;
    return (isPassedRange = true);
  } else {
    endWidthValue = parseInt(endWidth.value, 10);
    if (startWidthValue >= endWidthValue) {
      alert("Start width can not be greater or equal than end width");
      startWidthValue = endWidthValue;
      return (isPassedRange = false);
    } else {
      setWidthText.innerText = `Set width is between ${startWidthValue} - ${endWidthValue}`;
      isWidthSet = true;
      createImagesButton.disabled = false;
      return (isPassedRange = true);
    }
  }
}

function singleDownload() {
  let canvasToDownload = parseInt(
    document.getElementById("singleImageDownloadInput").value,
    10
  );
  startWidthValue = parseInt(startWidthValue, 10);
  console.log("HERE", startWidthValue + canvasToDownload);
  //canvasToDownload-1 to start the download File from 1 instead of 0
  //
  downloadFunction(
    canvasToDownload - 1,
    startWidthValue + canvasToDownload - 1
  );
} // RANGE SET FINISHED

function checkInverse() {
  if (inverseCheckbox.checked) isInverse = true;
  else isInverse = false;
}

function checkInvert() {
  if (invertCheckbox.checked) {
    isInvert = true;
  } else isInvert = false;
}

function checkRangeOrSinglePicture() {
  if (rangeSelection.checked) {
    endWidth.disabled = true;
  } else endWidth.disabled = false;
}

function selectFunction() {
  for (let index = 1; index <= 30; index++) {
    var option = "<option value='" + index + "'>Color " + index + "</option>";
    option.value = `color_${index}`;
    document.getElementById("colorPrefs").innerHTML += option;
    var colorNameOption =
      "<option value='" + index + "'>Color Name" + index + "</option>";
    option.value = `color_name_${index}`;
    document.getElementById("colorNames").innerHTML += colorNameOption;
  }
}

function loadColorNames() {
  const colorNamesOl = document.getElementById("colorNamesOl");
  colorNamesOl.innerHTML = "";
  colorNames.map((e, index) => {
    if (index != 0 && e != null) {
      const colorNameLi = document.createElement("li");
      colorNameLi.innerText = `${index} - ${e}`;
      colorNamesOl.append(colorNameLi);
    }
  });
}

function colorNameSaveButton() {
  let colorName = document.getElementById("colorName").value;
  let colorNameIndex = document.getElementById("colorNames").value;
  let result = true;
  if (colorNames[colorNameIndex]) {
    result = confirm("You are about to override the name");
  }
  if (!result) {
    return;
  } else {
    colorNames[colorNameIndex] = colorName;
    loadColorNames();
  }
  localStorage.setItem("colorNames", JSON.stringify(colorNames));
}

function colorPrefSaveButton() {
  let usersPref = document.getElementById("colorPrefs").value;

  if (usersPref <= 30 && usersPref >= 0) {
    console.log("userpref here", usersPref);
    localStorage.setItem(`colors_${usersPref}`, JSON.stringify(colors));
  }
}

document.getElementById("colorPrefs").addEventListener("change", () => {
  console.log("Color Pref Changed");
  getColorsFunction(document.getElementById("colorPrefs").value);
});

function setStringLengthText(length) {
  let stringLength = document.getElementById("stringLength");
  stringLength.innerText = `String's length: ${length}`;
}

function readTheString() {
  breakString();
  document.getElementById("foundZeros").innerText = `Found 0s: ${parseInt(
    amountOfZeros
  )}`;

  setStringLengthText(myCodeArray.length);

  stringColorCheck = [];

  for (color of myCodeArray) {
    if (!stringColorCheck.includes(color)) {
      stringColorCheck.push(color);
    }
  }
  console.log(stringColorCheck, colors);

  missingColorFunction();

  checkIsThereString();
  if (isThereString) {
    checkIsThereString();
    setStringLengthText(myCodeArray.length);
  }
  if (!isThereString) {
    setStringLengthText(0);
  }
}

// textArea.addEventListener("input", (event) => {
//   setTimeout(() => {
//     breakString();
//     document.getElementById("foundZeros").innerText = `Found 0s: ${parseInt(
//       amountOfZeros
//     )}`;

//     setStringLengthText(myCodeArray.length);

//     stringColorCheck = [];

//     for (color of myCodeArray) {
//       if (!stringColorCheck.includes(color)) {
//         stringColorCheck.push(color);
//       }
//     }
//     console.log(stringColorCheck, colors);

//     missingColorFunction();

//     checkIsThereString();
//     if (isThereString) {
//       checkIsThereString();
//       setStringLengthText(myCodeArray.length);
//     }
//     if (!isThereString) {
//       setStringLengthText(0);
//     }
//   }, 300);
// });

rangeSelection.addEventListener("click", () => {
  checkRangeOrSinglePicture();
});

inverseCheckbox.addEventListener("change", () => {
  checkInverse();
});

invertCheckbox.addEventListener("change", () => {
  checkInvert();
});

function lastUpdatedFunction() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let repos = JSON.parse(this.responseText);
      repos.forEach((repo) => {
        if (repo.name == "MSCProject") {
          document.querySelector(
            "footer"
          ).innerText = `An MSC Webpage - Last updated ${new Date(
            repo.updated_at
          )}`;
        }
      });
    }
  };
  xhttp.open("GET", "https://api.github.com/users/nisozakuto/repos", true);
  xhttp.send();
}

function init() {
  inverseCheckbox.checked = true;
  singleColor.checked = true;
  document.getElementById("colorNumber2").disabled = true;
  createImagesButton.disabled = true;
  checkInverse();

  if (localStorage.getItem("colorNames")) {
    colorNames = localStorage.getItem("colorNames");
  }
  console.log(colorNames);
  if (typeof (colorNames == String) && colorNames.length > 0) {
    colorNames = JSON.parse(colorNames);
  }

  loadColorNames();
  getColorsFunction(1); //Load Color1's colors
  lastUpdatedFunction();
}

init();
