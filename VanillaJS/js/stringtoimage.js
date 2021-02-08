let myString = "niso";
const userscolors = document.getElementById("userscolors");
let colors = [];
let myCodeArray = [],
  pixelSize = 10;
let canIAddTheRange = true;

function addingTheColor(number1, hex, number2) {
  if (number2 == undefined) {
    console.log("adding only one number");
    if (!colors[number1]) colors[number1] = hex;
    else {
      alert("this exists");
      //Deal with this later to add CHANGE feature
      return;
    }
  } else {
    for (number1; number1 <= number2; number1++) {
      if (colors[number1] != undefined) {
        canIAddTheRange = false;
      }
    }
    if (canIAddTheRange)
      for (number1; number1 <= number2; number1++) {
        colors[number1] = hex;
      }
  }
}

function createDOMForTheColor(number1, colorPickerValue) {
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

function addAColor() {
  console.log("========== Adding a color ==========");
  let chosenColorNumber = document.getElementById("colorNumber");
  chosenColorNumber = chosenColorNumber.value;

  addingTheColor(chosenColorNumber, colorPicker.value);
  createDOMForTheColor(chosenColorNumber, colorPicker.value);
}

function addARangeOfColor() {
  let firstNumber = document.getElementById("colorNumber1").value;
  let secondNumber = document.getElementById("colorNumber2").value;

  console.log(firstNumber, secondNumber);
  if (firstNumber >= secondNumber) {
    alert("Second number must be bigger than the first one");
  } else {
    for (firstNumber; firstNumber <= secondNumber; firstNumber++) {
      console.log(canIAddTheRange);
      addingTheColor(firstNumber, colorPicker.value, secondNumber);
      console.log(canIAddTheRange);
      if (canIAddTheRange) createDOMForTheColor(firstNumber, colorPicker.value);
      console.log(canIAddTheRange);
    }
  }
}

function breakString() {
  let code = document.getElementById("string").value;
  myCodeArray = code.split(/\n/);
}

function createPicture(rowLength) {
  let currentColor;
  let line = 0,
    column = 0;

  var canvas = document.createElement("canvas");
  canvas.style.width = "300px";
  // canvas.style.width = STRING'S_LENGTH;

  canvas.style.border = "1px solid black";
  var ctx = canvas.getContext("2d");

  // for (color of colors) {
  //   // console.log(color);
  // }

  //ADDING PIXELS
  console.log("rowLength", rowLength);
  for (let i = 1; i < myCodeArray.length + 1; i++) {
    ctx.fillStyle = colors[myCodeArray[i]];
    ctx.fillRect(line, column, pixelSize, pixelSize);
    line += pixelSize;
    if (i >= rowLength && i % rowLength == 0) {
      column += pixelSize;
      line = 0;
    }
  }

  // ctx.fillStyle = "ff0000";
  // ctx.fillRect(5, 10, 5, 5);
  // ctx.fillStyle = "green";
  // ctx.fillRect(10, 5, 5, 5);
  // ctx.fillStyle = "pink";
  // ctx.fillRect(10, 10, 5, 5);

  //   for (let i = 0; i < myCodeArray.length; i++) {
  //     ctx.fillStyle = colors[myCodeArray[i]];
  //     if (i % w == 0) {
  //       j = j + 5;
  //       k = 0;
  //     } else {
  //       k++;
  //     }
  //     ctx.fillRect(k, j, 5, 5);
  //   }

  const imagePrint = document.getElementsByClassName("imagePrint");
  imagePrint[0].append(canvas);

  //   const picArea = document.createElement("div");
  //   picArea.id = "picArea";
  //   picArea.style.width = w + "px";
  //   const imagePrint = document.getElementsByClassName("imagePrint");
  //   imagePrint[0].append(picArea);
  //   //   console.log("Creating the picture");
  //   for (let i = 0; i < myCodeArray.length; i++) {
  //     if (myCodeArray[i] == 0 && colors[0] == null) {
  //       //   console.log("0 spotted skipping", i);
  //     } else {
  //       //   console.log("Creating pixel");
  //       const Pixel = document.createElement("div");
  //       Pixel.classList.add("myPixel");
  //       //   console.log(colors[myCodeArray[i]]);
  //       Pixel.style.backgroundColor = colors[myCodeArray[i]];
  //       picArea.appendChild(Pixel);
  //     }
  //   }

  //   console.log("checking the myCodeArray", myCodeArray);
}

function roll() {
  console.log("LETS ROLL");
  breakString();
  //   colorDeclarationCheck();

  let rowLength = Math.round(Math.sqrt(myCodeArray.length));
  let stringLength = document.getElementById("stringLength");
  stringLength.innerText = `String's length is ${myCodeArray.length}`;
  console.log("forTest", rowLength);

  for (let index = 17; index < 47; index++) {
    createPicture(index);
  }

  // for (rowLength; rowLength < rowLength + 10; rowLength += pixelSize) {
  //   console.log("for");
  //   createPicture(rowLength);
  // }

  // for (let i = 100; i < 330; i++) {
  //   createPicture(i);
  // }
  //   if (canUCreate) {
  //     createPicture();
  //     // for (let i = myWidth; i < 310; i + 5) {}
  //     for (let i = 300; i < 330; i + 5) {}
  //   } else console.log("MISSING COLORS.");
}

function save() {
  if (localStorage.getItem("colors")) {
    localStorage.setItem("colors", JSON.stringify(colors));
  } else localStorage.setItem("colors", JSON.stringify(colors));
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

function init() {
  singleColor.checked = true;
  if (document.getElementsByClassName("addARangeOfColors")) {
    document.getElementsByClassName("addARangeOfColors")[0].style.display =
      "none";
  }
}

init();
