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
  myString = "niso",
  pixelSize = 1, //DONT CHANGE THIS VALUE
  canIAddTheRange = true,
  canIAddThisSingle = true,
  countstartWidthValue,
  endWidthValue,
  isPassedRange = false,
  isThereString = false,
  isSavedColorsLoaded = false,
  isWidthSet = false,
  isInverse = false,
  isInvert = false,
  isThereMissingColor = false,
  amountOfZeros,
  mycanvas,
  canvasWidth = 100, //DONT CHANGE THIS VALUE
  canvasHeigth = 100, //DONT CHANGE THIS VALUE
  imageNumberForThePage,
  isCountingZeros = false,
  startWidth = document.getElementById("startWidth"),
  endWidth = document.getElementById("endWidth"),
  setWidthText = document.getElementById("setWidthText"),
  currentColorSet,
  myColors = {},
  imageHeight,
  iAmDone = true;

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
}

function emtpyColors() {
  colors = [];
}

function clearResults() {
  alert("Clearing the results");
  document.getElementsByClassName("imagePrint")[0].innerHTML = "";
  emtpyColors;
  if (document.getElementById("downloadButtons").innerHTML != undefined)
    document.getElementById("downloadButtons").innerHTML = "";
  clearYourColorsDOM();
  statusText = "";
}

function addColor(number1, hex) {
  number1 = parseInt(number1, 10);
  if (!colors[number1] || colors[number1] != null) {
    colors[number1] = hex;
    return;
  } else {
    alert("this exists");
    canIAddThisSingle = false;
    return;
  }
}

function addingTheColor(number1, hex, number2) {
  console.log("add the color Func", number2);
  if (number2 == undefined) {
    // Adding only one color
    console.log("add one pic", number1);
    addColor(number1, hex);
  } else if (number2) {
    canIAddTheRange = true;
    // Adding a range of colors
    console.log("add range of pic");
    for (let i = number1; i <= number2; i++) {
      if (colors[i] != undefined || colors[i] != "") {
        canIAddTheRange = false;
      }
    }
    if (canIAddTheRange)
      for (let i = number1; i <= number2; i++) {
        console.log("ekleniyor", i);
        addColor(i, hex);
      }
  }
}

// let definedColor;

function pElement(colorPickerValue, number1, number2) {
  const myColorNamelabel = document.createElement("p");
  myColorNamelabel.innerText = "Color HEX is:";
  definedColor.append(myColorNamelabel);

  if (number2) {
    myColorNamelabel.innerText += ` ${colorPickerValue} and the color: ${number1} to ${number2}`;
  } else {
    myColorNamelabel.innerText +=
      " " + colorPickerValue + " and the color: " + number1;
  }
}

function divColorIcon(colorPickerValue) {
  const colorDiv = document.createElement("div");
  colorDiv.style.backgroundColor = colorPickerValue;
  colorDiv.style.width = "20px";
  colorDiv.style.height = "20px";
  definedColor.append(colorDiv);
}

function buttonDeleteButton() {
  deleteButton = document.createElement("button");
  deleteButton.style.width = "20px";
  deleteButton.style.height = "20px";
  deleteButton.innerText = "X";
  definedColor.append(deleteButton);
}

function createDOMForTheColor(number1, colorPickerValue, number2) {
  const definedColor = document.createElement("div");
  //CHANGE myString in the future
  definedColor.id = myString;
  userscolors.append(definedColor);

  if (singleColor.checked == true) {
    // pElement(colorPickerValue, number1);

    const myColorNamelabel = document.createElement("p");
    myColorNamelabel.innerText = "Color HEX is:";
    definedColor.append(myColorNamelabel);

    myColorNamelabel.innerText +=
      " " + colorPickerValue + " and the color: " + number1;

    // divColorIcon(colorPickerValue);
    const colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = colorPickerValue;
    colorDiv.style.width = "20px";
    colorDiv.style.height = "20px";
    definedColor.append(colorDiv);
    // buttonDeleteButton();
    deleteButton = document.createElement("button");
    deleteButton.style.width = "20px";
    deleteButton.style.height = "20px";
    deleteButton.innerText = "X";
    definedColor.append(deleteButton);
    deleteButton.addEventListener("click", () => {
      // deleteFunction(number1);
      delete colors[number1];
      delete `colors_${document.getElementById("colorPrefs").value}`[number1];
      definedColor.remove();
      colorPrefSaveButton();
    });
  } else if (rangeColor.checked == true) {
    // pElement(colorPickerValue, number1, number2);
    const myColorNamelabel = document.createElement("p");
    myColorNamelabel.innerText = "Color HEX is:";
    definedColor.append(myColorNamelabel);

    myColorNamelabel.innerText += ` ${colorPickerValue} and the color: ${number1} to ${number2}`;

    // divColorIcon(colorPickerValue);
    const colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = colorPickerValue;
    colorDiv.style.width = "20px";
    colorDiv.style.height = "20px";
    definedColor.append(colorDiv);
    // buttonDeleteButton();
    deleteButton = document.createElement("button");
    deleteButton.style.width = "20px";
    deleteButton.style.height = "20px";
    deleteButton.innerText = "X";
    definedColor.append(deleteButton);
    deleteButton.addEventListener("click", () => {
      for (let index = number1; index <= number2; index++) {
        // deleteFunction(index);
        delete colors[index];
        delete `colors_${document.getElementById("colorPrefs").value}`[index];
      }
      definedColor.remove();
      colorPrefSaveButton();
    });
  }
}

function zeroCheck() {
  if (colors[0] == undefined) {
    isCountingZeros = false;
    zeroStatus.innerText = `Removing 0s from the list`;
  } else {
    isCountingZeros = true;
    zeroStatus.innerText = `Keeping 0s in the list`;
  }
  breakString();
}

//RANGE OF COLOR START
function addARangeOfColor() {
  let firstNumber = parseInt(document.getElementById("colorNumber1").value, 10);
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
        return;
      }
    }
    if (canIAddTheRange) {
      for (let i = firstNumber; i <= secondNumber; i++) {
        addingTheColor(i, colorPicker.value);
      }
      createDOMForTheColor(firstNumber, colorPicker.value, secondNumber);
    }
  }
}
//RANGE OF COLOR END

// ADD A COLOR
function addAColor() {
  if (singleColor.checked == true) {
    console.log("========== Adding a color ==========");
    let chosenColorNumber = parseInt(
      document.getElementById("colorNumber1").value,
      10
    );
    if (canIAddThisSingle && !colors[chosenColorNumber]) {
      addingTheColor(chosenColorNumber, colorPicker.value);
      createDOMForTheColor(chosenColorNumber, colorPicker.value);
    } else {
      alert("This color is already in your list");
    }
  } else if (rangeColor.checked == true) {
    console.log("add a range");
    addARangeOfColor();
  }
  zeroCheck();
}
// ADD A COLOR FINISHED

function breakString() {
  amountOfZeros = 0;
  let code = document.getElementById("string").value;
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
}

function calcImageHeight(stringLength, rowLength) {
  imageHeight = Math.ceil(stringLength / rowLength);
  console.log(
    `StringLength: ${stringLength} RowLength ${rowLength}, imageHeight ${imageHeight}`
  );

  return imageHeight;
}

function createPicture(rowLength) {
  // const createPicture = async (rowLength) => {
  calcImageHeight(myCodeArray.length, rowLength);
  let canvasNumberh2 = document.createElement("h2");
  canvasNumberh2.innerText = `Image number: ${imageNumberForThePage} & Width is: ${rowLength} & Height is: ${imageHeight}`;
  canvasNumberh2.id = "canvasH2";

  let canvas = document.createElement("canvas");
  // canvas.width = canvasWidth;
  // canvas.height = canvasHeigth;

  canvas.width = rowLength;
  canvas.height = imageHeight;

  let line, column;

  if (isInverse) {
    (line = 0), (column = rowLength);

    canvas.style.border = "1px solid black";
    var ctx = canvas.getContext("2d");
    if (isInvert) {
      ctx.filter = "invert(1)";
    }

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
    if (isInvert) {
      ctx.filter = "invert(1)";
    }

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
}

function downloadFunction(index, startWidthValueForDownload) {
  calcImageHeight(myCodeArray.length, startWidthValueForDownload);
  var downloadUrl = mycanvas[index].toDataURL("image/png");
  var a = document.createElement("a");
  a.href = downloadUrl;
  a.target = "_parent";
  if ("download" in a) {
    a.download = `File_${
      index + 1
    }_Width:${startWidthValueForDownload}_Height_${imageHeight}`;
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

const roll = async () => {
  //First Check is passed range
  // console.log(`isPassedRange${isPassedRange} isThereString${isThereString}`);

  //Create a function to check the missing number 1)When string changes 2)When a color is added
  //Adjust the isThereMissingColor Var
  // if (isThereMissingColor) {
  checkIsThereString();

  if (false) {
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
    console.log(
      missingColorsString,
      missingColorsString.slice(0, missingColorsString.length - 1)
    );

    alert(
      `Missing colors are: ${missingColorsString.slice(
        0,
        missingColorsString.length - 1
      )}`
    );
  }
  if (!isPassedRange) {
    alert("Set the range");
  } else if (!isThereString) {
    alert("There is no string");
  } else if (isPassedRange && isThereString) {
    console.log("LETS ROLL");
    zeroCheck();
    imageNumberForThePage = 1;

    //Create pictures
    for (let index = startWidthValue; index <= endWidthValue; index++) {
      await sleep(50);
      createPicture(index);
      imageNumberForThePage++;
      if (index < endWidthValue)
        statusText.innerText = `Drawing pictures. Currently at ${index}`;
      else statusText.innerText = `Finished`;

      // setTimeout(() => {
      //   createPicture(index);
      //   imageNumberForThePage++;
      //   if (index < endWidthValue)
      //     statusText.innerText = `Drawing pictures. Currently at ${index}`;
      //   else statusText.innerText = `Finished`;
      // }, 1000);
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
          console.log("disabled");
          mycanvas = document.querySelectorAll("canvas");
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
            });
          }
          document.getElementById("iAmDoneButton").disabled = true;
        }
      });
      mainButtons.appendChild(iAmDoneButton);
    }
  } else {
    alert("Speak with the developer");
  }
};

const tryme = async () => {
  mycanvas = document.querySelectorAll("canvas");
  let startWidthValueForDownload = startWidthValue;

  for (let index = 0; index < mycanvas.length; index++) {
    console.log("For-loop", index);
    await sleep(400);
    console.log(`Index${index}-Start Value${startWidthValueForDownload}`);
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
    console.log("Was not saved");
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

      const colorDiv = document.createElement("div");
      colorDiv.style.backgroundColor = colorPickerValue;
      colorDiv.style.width = "20px";
      colorDiv.style.height = "20px";
      definedColor.append(colorDiv);

      deleteButton = document.createElement("button");
      deleteButton.style.width = "20px";
      deleteButton.style.height = "20px";
      deleteButton.innerText = "X";
      deleteButton.id = "xButton";
      definedColor.append(deleteButton);

      deleteButton.addEventListener("click", () => {
        myColors[key].map((e) => {
          console.log(e);
          colors[e] = null;
        });
        colorPrefSaveButton();
        definedColor.remove();
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
});
//RADIO BUTTONS END

// RANGE SET
function setRangeWidth() {
  startWidthValue = parseInt(startWidth.value, 10);
  console.log(startWidthValue);
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
  console.log(`Index-Start Value${startWidthValue + canvasToDownload}`);

  downloadFunction(canvasToDownload - 1, startWidthValue + canvasToDownload);
}
// RANGE SET FINISHED

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

function colorPrefLoadButton() {
  emtpyColors();
  let usersPref = document.getElementById("colorPrefs").value;
  switch (usersPref) {
    case "0":
      getColorsFunction(0);
      break;
    case "1":
      getColorsFunction(1);
      break;
    case "2":
      getColorsFunction(2);
      break;
    case "3":
      getColorsFunction(3);
      break;
    case "4":
      getColorsFunction(4);
      break;
    case "5":
      getColorsFunction(5);
      break;
    case "6":
      getColorsFunction(6);
      break;
    case "7":
      getColorsFunction(7);
      break;
    case "8":
      getColorsFunction(8);
      break;
    case "9":
      getColorsFunction(9);
      break;
    case "10":
      getColorsFunction(10);
      break;
    case "11":
      getColorsFunction(11);
      break;
    case "12":
      getColorsFunction(12);
      break;
    case "13":
      getColorsFunction(13);
      break;
    case "14":
      getColorsFunction(14);
      break;
    case "15":
      getColorsFunction(15);
      break;
    case "16":
      getColorsFunction(16);
      break;
    case "17":
      getColorsFunction(17);
      break;
    case "18":
      getColorsFunction(18);
      break;
    case "19":
      getColorsFunction(19);
      break;
    case "20":
      getColorsFunction(20);
      break;
    case "21":
      getColorsFunction(21);
      break;
    case "22":
      getColorsFunction(22);
      break;
    case "23":
      getColorsFunction(23);
      break;
    case "24":
      getColorsFunction(24);
      break;
    case "25":
      getColorsFunction(25);
      break;
    case "26":
      getColorsFunction(26);
      break;
    case "27":
      getColorsFunction(27);
      break;
    case "28":
      getColorsFunction(28);
      break;
    case "29":
      getColorsFunction(29);
      break;
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
    console.log(typeof colorNames);

    loadColorNames();
  }
  localStorage.setItem("colorNames", JSON.stringify(colorNames));
}

function colorPrefSaveButton() {
  let usersPref = document.getElementById("colorPrefs").value;
  switch (usersPref) {
    case "0":
      localStorage.setItem("colors_0", JSON.stringify(colors));
      break;
    case "1":
      localStorage.setItem("colors_1", JSON.stringify(colors));
      break;
    case "2":
      localStorage.setItem("colors_2", JSON.stringify(colors));
      break;
    case "3":
      localStorage.setItem("colors_3", JSON.stringify(colors));
      break;
    case "4":
      localStorage.setItem("colors_4", JSON.stringify(colors));
      break;
    case "5":
      localStorage.setItem("colors_5", JSON.stringify(colors));
      break;
    case "6":
      localStorage.setItem("colors_6", JSON.stringify(colors));
      break;
    case "7":
      localStorage.setItem("colors_7", JSON.stringify(colors));
      break;
    case "8":
      localStorage.setItem("colors_8", JSON.stringify(colors));
      break;
    case "9":
      localStorage.setItem("colors_9", JSON.stringify(colors));
      break;
    case "10":
      localStorage.setItem("colors_10", JSON.stringify(colors));
      break;
    case "11":
      localStorage.setItem("colors_11", JSON.stringify(colors));
      break;
    case "12":
      localStorage.setItem("colors_12", JSON.stringify(colors));
      break;
    case "13":
      localStorage.setItem("colors_13", JSON.stringify(colors));
      break;
    case "14":
      localStorage.setItem("colors_14", JSON.stringify(colors));
      break;
    case "15":
      localStorage.setItem("colors_15", JSON.stringify(colors));
      break;
    case "16":
      localStorage.setItem("colors_16", JSON.stringify(colors));
      break;
    case "17":
      localStorage.setItem("colors_17", JSON.stringify(colors));
      break;
    case "18":
      localStorage.setItem("colors_18", JSON.stringify(colors));
      break;
    case "19":
      localStorage.setItem("colors_19", JSON.stringify(colors));
      break;
    case "20":
      localStorage.setItem("colors_20", JSON.stringify(colors));
      break;
    case "21":
      localStorage.setItem("colors_21", JSON.stringify(colors));
      break;
    case "22":
      localStorage.setItem("colors_22", JSON.stringify(colors));
      break;
    case "23":
      localStorage.setItem("colors_23", JSON.stringify(colors));
      break;
    case "24":
      localStorage.setItem("colors_24", JSON.stringify(colors));
      break;
    case "25":
      localStorage.setItem("colors_25", JSON.stringify(colors));
      break;
    case "26":
      localStorage.setItem("colors_26", JSON.stringify(colors));
      break;
    case "27":
      localStorage.setItem("colors_27", JSON.stringify(colors));
      break;
    case "28":
      localStorage.setItem("colors_28", JSON.stringify(colors));
      break;
    case "29":
      localStorage.setItem("colors_29", JSON.stringify(colors));
      break;
    case "30":
      localStorage.setItem("colors_30", JSON.stringify(colors));
      break;
    default:
      console.log("Fell on default");
  }
}

document.getElementById("colorPrefs").addEventListener("change", () => {
  console.log("Color Pref Changed");
  getColorsFunction(document.getElementById("colorPrefs").value);
});

textArea.addEventListener("input", (event) => {
  setTimeout(() => {
    breakString();
    document.getElementById("foundZeros").innerText = `Found 0s: ${parseInt(
      amountOfZeros
    )}`;
    let stringLength = document.getElementById("stringLength");
    stringLength.innerText = `String's length is ${myCodeArray.length}`;

    let stringColorCheck = [];

    for (color of myCodeArray) {
      if (!stringColorCheck.includes(color)) {
        stringColorCheck.push(color);
      }
    }
    console.log(stringColorCheck, colors);
    missingColors = [];
    for (number of stringColorCheck) {
      // number = parseInt(number, 10);
      if (colors[number] == null) {
        if (!missingColors.includes(number) && number.length > 0) {
          missingColors.push(number);
        }
        isThereMissingColor = true;
      }
    }
    checkIsThereString();
    if (isThereString) {
      checkIsThereString();
      stringLength.innerText = `String's Length is: ${myCodeArray.length}`;
    }
    if (!isThereString) {
      stringLength.innerText = `String's Length is: 0`;
    }
  }, 300);
});

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

  //Load Color1's colors
  getColorsFunction(1);
  lastUpdatedFunction();
}

init();
