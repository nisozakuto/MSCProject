//https://www.geeksforgeeks.org/how-to-show-page-loading-div-until-the-page-has-finished-loading/

const userscolors = document.getElementById("userscolors");
let colors = [],
  myCodeArray = [],
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
  deleteTheZeros = true,
  amountOfZeros,
  mycanvas,
  canvasWidth = 1000, //DONT CHANGE THIS VALUE
  canvasHeigth = 1000, //DONT CHANGE THIS VALUE
  imageNumberForThePage,
  isCountingZeros = false;

let indices;
var idx;

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};

const getColorsFromStorageButton = document.getElementById(
  "getColorsFromStorage"
);
const createImagesButton = document.getElementById("roll");
const checkbox = document.getElementById("checkbox");
const zeroStatus = document.getElementById("isCountingZeros");

function clearResults() {
  alert("Clearing the results");
  document.getElementsByClassName("imagePrint")[0].innerHTML = "";
}

function addingTheColor(number1, hex, number2) {
  console.log("add the color");
  if (number2 == undefined) {
    // Adding only one color
    if (!colors[number1]) {
      colors[number1] = hex;
    } else {
      alert("this exists");
      canIAddThisSingle = false;
      //Deal with this later to add CHANGE feature
      return;
    }
  } else if (number2) {
    canIAddTheRange = true;
    // Adding a range of colors
    for (let i = number1; i <= number2; i++) {
      if (colors[i] != undefined) {
        canIAddTheRange = false;
      }
    }
    if (canIAddTheRange)
      for (let i = number1; i <= number2; i++) {
        console.log("ekleniyor", i);
        colors[i] = hex;
      }
  }
}

function createDOMForTheColor(number1, colorPickerValue) {
  console.log("adding to dom");
  const definedColor = document.createElement("div");
  //CHANGE myString
  definedColor.id = myString;
  userscolors.append(definedColor);

  const myColorNamelabel = document.createElement("p");
  myColorNamelabel.innerText = "Colors HEX are:";
  definedColor.append(myColorNamelabel);
  myColorNamelabel.innerText +=
    " " + colorPickerValue + " and the color: " + number1;

  const colorDiv = document.createElement("div");
  colorDiv.style.backgroundColor = colorPickerValue;
  colorDiv.style.width = "20px";
  colorDiv.style.height = "20px";
  definedColor.append(colorDiv);
}

//RANGE OF COLOR START
function addARangeOfColor() {
  let firstNumber = parseInt(document.getElementById("colorNumber1").value, 10);
  let secondNumber = parseInt(
    document.getElementById("colorNumber2").value,
    10
  );
  if (firstNumber >= secondNumber) {
    console.log(firstNumber, secondNumber, firstNumber >= secondNumber);
    alert("Second number must be bigger than the first one");
  } else if (secondNumber > firstNumber) {
    console.log("Lets add");
    for (let i = firstNumber; i <= secondNumber; i++) {
      console.log(i);
      if (colors[i] != undefined) {
        console.log(i, "is not undefined. ", colors[i]);
        alert(`${i} is already added to your colors`);
        return;
      }
    }

    for (firstNumber; firstNumber <= secondNumber; firstNumber++) {
      if (canIAddTheRange) {
        addingTheColor(firstNumber, colorPicker.value);

        const definedColor = document.createElement("div");
        definedColor.id = myString;
        userscolors.append(definedColor);

        const myColorNamelabel = document.createElement("p");
        myColorNamelabel.innerText = "Colors HEX are: ";
        definedColor.append(myColorNamelabel);
        myColorNamelabel.innerText +=
          " " +
          colorPicker.value +
          " and the color: " +
          firstNumber +
          " " +
          secondNumber;

        const colorDiv = document.createElement("div");
        colorDiv.style.backgroundColor = colorPicker.value;
        colorDiv.style.width = "20px";
        colorDiv.style.height = "20px";
        definedColor.append(colorDiv);
      }
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
    }
  } else if (rangeColor.checked == true) {
    console.log("add a range");
    addARangeOfColor();
  }
  zeroCheck();
}
// ADD A COLOR FINISHED

function zeroCheck() {
  if (colors[0] == undefined) {
    isCountingZeros = false;
    zeroStatus.innerText = `Removing 0s from the list`;
  } else {
    isCountingZeros = true;
    zeroStatus.innerText = `Keeping 0s in the list`;
  }
}

function breakString() {
  amountOfZeros = 0;
  zeroCheck();
  let code = document.getElementById("string").value;
  myCodeArray = code.split(/\n/);

  if (deleteTheZeros) {
    for (var i = 0; i < myCodeArray.length; i++) {
      console.log(myCodeArray[i], i);

      if (myCodeArray[i] === "0") {
        console.log(myCodeArray[i], i);
        amountOfZeros++;
        myCodeArray.splice(i, 1);
        i--;
      }
    }
  }
  console.log(amountOfZeros);
  document.getElementById("foundZeros").innerText = `Found 0s: ${parseInt(
    amountOfZeros
  )}`;
}

function createPicture(rowLength) {
  let canvasNumberh2 = document.createElement("h2");
  canvasNumberh2.innerText = `Image number: ${imageNumberForThePage}`;
  canvasNumberh2.id = "canvasH2";

  let canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeigth;
  let line, column;

  if (isInverse) {
    console.log("inverse creation");
    (line = 0), (column = rowLength);

    canvas.style.border = "1px solid black";
    var ctx = canvas.getContext("2d");

    // ADDING PIXELS
    for (let i = 0; i < myCodeArray.length; i++) {
      column -= pixelSize;
      ctx.fillStyle = colors[myCodeArray[i]];
      ctx.fillRect(column, line, pixelSize, pixelSize);
      console.log(column, line, pixelSize, pixelSize);
      if (column <= 0) {
        line += pixelSize;
        column = rowLength;
      }
    }
  } else {
    column = line = 0;

    canvas.style.border = "1px solid black";
    var ctx = canvas.getContext("2d");

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

function roll() {
  //First Check is passed range
  if (isPassedRange && isThereString) {
    console.log("LETS ROLL");
    zeroCheck();
    imageNumberForThePage = 1;
    breakString();
    let stringLength = document.getElementById("stringLength");
    stringLength.innerText = `String's length is ${myCodeArray.length}`;

    for (let index = startWidthValue; index < endWidthValue; index++) {
      setTimeout(() => {
        createPicture(index);
        imageNumberForThePage++;
      }, 1000);
    }

    let resultAmount = endWidthValue - startWidthValue;

    setTimeout(() => {
      mycanvas = document.querySelectorAll("canvas");
      for (let i = 0; i < resultAmount; i = i + 10) {
        let downloadButton = document.createElement("button");
        document.getElementById("buttonsSection").append(downloadButton);
        downloadButton.innerText = `Download ${i + 1} to ${i + 10}`;
        downloadButton.addEventListener("click", () => {
          console.log("one of the buttons");
          let index = i;
          for (index; index < i + 10; index++) {
            console.log(index, "index bu");
            var downloadUrl = mycanvas[index].toDataURL("image/png");
            var a = document.createElement("a");
            a.href = downloadUrl;
            a.target = "_parent";
            if ("download" in a) {
              a.download = "File_" + (index + 1);
            }
            (document.body || document.documentElement).appendChild(a);
            if (a.click) {
              a.click(); // The click method is supported by most browsers.
            }
            a.parentNode.removeChild(a);
          }
        });
      }
    }, 3000);
  } else {
    alert("set the Range and enter an input");
  }
}

function save() {
  let result = confirm("Are you sure you want to save?");
  if (result) {
    if (colors.length == 0) alert("Please first add colors");
    else localStorage.setItem("colors", JSON.stringify(colors));
  } else {
    console.log("Was not saved");
  }
}

function getColorsFromStorage() {
  isSavedColorsLoaded = true;
  colors = localStorage.getItem("colors");
  colors = JSON.parse(colors);
  console.log(colors);
  if (colors) {
    for (let i = 0; i < colors.length; i++) {
      if (colors[i] != null) {
        //Try to use function instead of the repeating the same code
        const definedColor = document.createElement("div");
        definedColor.id = myString;
        userscolors.append(definedColor);

        const myColorNamelabel = document.createElement("p");
        myColorNamelabel.innerText = "Color number:";
        definedColor.append(myColorNamelabel);
        myColorNamelabel.innerText += " " + colors[i] + " and the color: " + i;

        const colorDiv = document.createElement("div");
        colorDiv.style.backgroundColor = colors[i];
        colorDiv.style.width = "20px";
        colorDiv.style.height = "20px";
        definedColor.append(colorDiv);
      }
    }
  }
}

//RADIO BUTTONS START
const singleColor = document.getElementById("singleColor");
const rangeColor = document.getElementById("rangeOfColor");

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

const textArea = document.querySelector("textarea");
textArea.addEventListener("input", (event) => {
  breakString();
  stringLength.innerText = `String's Length is: ${myCodeArray.length}`;
  if (myCodeArray.length >= 0) isThereString = true;
});

// RANGE SET
function setRangeWidth() {
  let startWidth = document.getElementById("startWidth");
  let endWidth = document.getElementById("endWidth");
  let setWidthText = document.getElementById("setWidthText");
  (startWidthValue = parseInt(startWidth.value, 10)),
    (endWidthValue = parseInt(endWidth.value, 10));

  console.log(startWidthValue, endWidthValue);
  if (startWidthValue >= endWidthValue) {
    alert("Start width can not be greater or equal than end width");
    startWidthValue = endWidthValue;
    return (isPassedRange = false);
  } else {
    console.log("+++", startWidthValue, endWidthValue);
    setWidthText.innerText = `Set width is between ${startWidthValue} - ${endWidthValue}`;
    isWidthSet = true;
    createImagesButton.disabled = false;
    return (isPassedRange = true);
  }
}
// RANGE SET FINISHED

getColorsFromStorageButton.addEventListener("click", () => {
  if (!isSavedColorsLoaded) {
    getColorsFromStorage();
  }
  if (isSavedColorsLoaded) {
    getColorsFromStorageButton.disabled = true;
  }
});
checkbox.addEventListener("change", () => {
  if (checkbox.checked) isInverse = true;
  else isInverse = false;
});

function init() {
  singleColor.checked = true;
  document.getElementById("colorNumber2").disabled = true;
  createImagesButton.disabled = true;
}

init();
