//https://www.geeksforgeeks.org/how-to-show-page-loading-div-until-the-page-has-finished-loading/

const userscolors = document.getElementById("userscolors");
let colors = [],
  myCodeArray = [],
  myString = "niso",
  pixelSize = 1,
  canIAddTheRange = true,
  canIAddThisSingle = true,
  startWidthValue,
  endWidthValue,
  isPassedRange = false,
  isThereString = false,
  isSavedColorsLoaded = false,
  isWidthSet = false;

const getColorsFromStorageButton = document.getElementById(
  "getColorsFromStorage"
);
const createImagesButton = document.getElementById("roll");

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
  myColorNamelabel.innerText = "Color number:";
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
    for (let i = firstNumber; i < secondNumber; i++) {
      console.log(i);
      if (colors[i] != undefined) {
        console.log(i, "is not undefined. ", colors[i]);
        alert(`${i} is already added to your colors`);
        return;
      }
    }

    for (firstNumber; firstNumber <= secondNumber; firstNumber++) {
      addingTheColor(firstNumber, colorPicker.value);
      if (canIAddTheRange) {
        createDOMForTheColor(firstNumber, colorPicker.value);
        console.log(firstNumber, "firstNumber");
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
}
// ADD A COLOR FINISHED

function breakString() {
  let code = document.getElementById("string").value;
  myCodeArray = code.split(/\n/);
}

function createPicture(rowLength) {
  let line = 0,
    column = 0;

  var canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  canvas.style.border = "1px solid black";
  var ctx = canvas.getContext("2d");

  //ADDING PIXELS
  for (let i = 1; i < myCodeArray.length + 1; i++) {
    ctx.fillStyle = colors[myCodeArray[i]];
    ctx.fillRect(line, column, pixelSize, pixelSize);
    line += pixelSize;
    if (i >= rowLength && i % rowLength == 0) {
      column += pixelSize;
      line = 0;
    }
  }
  const imagePrint = document.getElementsByClassName("imagePrint");
  imagePrint[0].append(canvas);
  console.log("fininshed", rowLength);
}

function roll() {
  //First Check is passed range
  if (isPassedRange && isThereString) {
    console.log("LETS ROLL");
    breakString();
    let rowLength = Math.round(Math.sqrt(myCodeArray.length));
    let stringLength = document.getElementById("stringLength");
    stringLength.innerText = `String's length is ${myCodeArray.length}`;
    let progressBar = document.getElementById("progressBar");

    for (let index = startWidthValue; index < endWidthValue; index++) {
      console.log(startWidthValue, endWidthValue);
      createPicture(index);
      console.log(index, "loading");
    }
  } else {
    alert("set the Range and enter an input");
  }
  console.log(linkText);
  linkText.disabled = false;
  let resultAmount = endWidthValue - startWidthValue;

  for (let i = 10; i < resultAmount; i = i + 10) {
    let downloadButton = document.createElement("button");
    document.getElementById("inputsSection").after(downloadButton);
    downloadButton.innerText = ("Download Button for the ", i);

    downloadButton.addEventListener("click", () => {
      console.log("one of the buttons");
      let mycanvas = document.querySelectorAll("canvas");
      let index = i;
      console.log(mycanvas);
      console.log(mycanvas[i]);
      console.log(mycanvas[i].toDataURL("image/png"));

      console.log("i", i);
      for (index; index < index + 10; index++) {
        var downloadUrl = mycanvas[index].toDataURL("image/png");
        var a = document.createElement("a");
        a.href = downloadUrl;
        a.target = "_parent";
        if ("download" in a) {
          a.download = "File_" + index;
        }
        (document.body || document.documentElement).appendChild(a);
        if (a.click) {
          a.click(); // The click method is supported by most browsers.
        }
        a.parentNode.removeChild(a);
      }
    });
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
  if (myCodeArray.length > 0) isThereString = true;
});

let linkText = document.createElement("button");
linkText.innerHTML = "Download Image(s)";
linkText.id = "linkText";
let count = 0;

linkText.addEventListener("click", () => {
  console.log("clicked");
  let mycanvas = document.querySelectorAll("canvas");

  console.log("Hety", mycanvas);
  mycanvas.forEach((canvas, index) => {
    var downloadUrl = canvas.toDataURL("image/png");
    console.log("Hety", canvas);

    setTimeout(function () {
      var a = document.createElement("a");
      a.href = downloadUrl;
      a.target = "_parent";
      if ("download" in a) {
        a.download = downloadUrl;
      }

      (document.body || document.documentElement).appendChild(a);
      if (a.click) {
        a.click(); // The click method is supported by most browsers.
      }
      console.log(count);
      a.parentNode.removeChild(a);
      count++;
    }, 1300);
  });
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

document.getElementById("userscolors").append(linkText);

getColorsFromStorageButton.addEventListener("click", () => {
  if (!isSavedColorsLoaded) {
    getColorsFromStorage();
  }
  if (isSavedColorsLoaded) {
    getColorsFromStorageButton.disabled = true;
  }
});

function init() {
  singleColor.checked = true;
  document.getElementById("colorNumber2").disabled = true;
  linkText.disabled = true;
  createImagesButton.disabled = true;
}

init();
