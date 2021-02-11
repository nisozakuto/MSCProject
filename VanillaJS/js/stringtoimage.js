const userscolors = document.getElementById("userscolors");
let colors = [],
  myCodeArray = [],
  myString = "niso",
  pixelSize = 2,
  canIAddTheRange = true,
  canIAddThisSingle = true,
  startWidthValue,
  endWidthValue,
  isPassedRange = false,
  isThereString = false;

function addingTheColor(number1, hex, number2) {
  if (number2 == undefined) {
    console.log("adding only one number");
    if (!colors[number1]) {
      colors[number1] = hex;
    } else {
      alert("this exists");
      canIAddThisSingle = false;
      //Deal with this later to add CHANGE feature
      return;
    }
  } else if (number2) {
    console.log("number2 is corretc");
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
// ADD A COLOR
function addAColor() {
  console.log("========== Adding a color ==========");
  let chosenColorNumber = parseInt(
    document.getElementById("colorNumber").value,
    10
  );

  addingTheColor(chosenColorNumber, colorPicker.value);
  if (canIAddThisSingle) {
    createDOMForTheColor(chosenColorNumber, colorPicker.value);
  }
}
// ADD A COLOR FINISHED

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

function breakString() {
  let code = document.getElementById("string").value;
  myCodeArray = code.split(/\n/);
}

function createPicture(rowLength) {
  let currentColor;
  let line = 0,
    column = 0;

  var canvas = document.createElement("canvas");
  canvas.style.width = "600px";
  // canvas.style.width = STRING'S_LENGTH;

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
}

function roll() {
  //First Check is passed range
  if (isPassedRange && isThereString) {
    console.log("LETS ROLL");
    breakString();
    //   colorDeclarationCheck();
    let rowLength = Math.round(Math.sqrt(myCodeArray.length));
    let stringLength = document.getElementById("stringLength");
    stringLength.innerText = `String's length is ${myCodeArray.length}`;

    for (let index = startWidthValue; index < endWidthValue; index++) {
      createPicture(index);
    }
  } else {
    alert("set the Range and enter an input");
  }
}

function save() {
  localStorage.setItem("colors", JSON.stringify(colors));
}

function getColorsFromStorage() {
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
  if (rangeColor) {
    rangeColor.checked = false;
  }
  if (document.getElementsByClassName("addARangeOfColors")) {
    document.getElementsByClassName("addARangeOfColors")[0].style.display =
      "none";
  }
  document.getElementsByClassName("addANewColor")[0].style.display = "";
});

rangeColor.addEventListener("click", () => {
  if (singleColor) {
    singleColor.checked = false;
  }

  if (document.getElementsByClassName("addANewColor")) {
    document.getElementsByClassName("addANewColor")[0].style.display = "none";
  }
  document.getElementsByClassName("addARangeOfColors")[0].style.display = "";
});
//RADIO BUTTONS END

const textArea = document.querySelector("textarea");
textArea.addEventListener("input", (event) => {
  breakString();
  stringLength.innerText = `String's Length is: ${myCodeArray.length}`;
  if (myCodeArray.length > 0) isThereString = true;
});

var linkText = document.createElement("button");
linkText.innerHTML = "Download image";
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
    return (isPassedRange = true);
  }
}
// RANGE SET FINISHED

document.getElementById("userscolors").append(linkText);

function init() {
  singleColor.checked = true;
  if (document.getElementsByClassName("addARangeOfColors")) {
    document.getElementsByClassName("addARangeOfColors")[0].style.display =
      "none";
  }
}

init();
