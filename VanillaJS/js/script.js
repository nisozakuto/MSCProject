let iscreateSecondDropdownCreated = false;
let myString = "niso";
let myArray = [];
let colors = [];
let myCode;
let myCodeArray = [];
let colorsObj = {};
let canUCreate = true;
let myWidth = 300;
let maxWidth = 600;
let missingColors = [];

const userscolors = document.getElementById("userscolors");
const colorPicker = document.getElementById("colorPicker");
const string = document.getElementById("string");
const myArticleArea = document.getElementById("article");
const imagePrint = document.getElementsByClassName("imagePrint");

function breakString() {
  code = document.getElementById("string").value;
  console.log(code);
  myCodeArray = code.split(/\n/);
  console.log(myCodeArray);
}

function createPixel(c) {
  // const Pixel = document.createElement("div");
  // Pixel.classList.add("myPixel");
  // console.log(readTheNumber(c));
  // console.log(colors[c]);
  // Pixel.style.backgroundColor = colors[c];
  // imagePrint[0].appendChild(Pixel);
}

function createPicture() {
  const picArea = document.createElement("div");
  picArea.id = "picArea";

  console.log("Creating the picture");
  for (let i = 0; i < myCodeArray.length; i++) {
    if (myCodeArray[i] == 0 && colors[0] == null) {
      console.log("0 spotted skipping", i);
    } else {
      console.log("Creating pixel");
      // createPixel(myCodeArray[i]);
      const Pixel = document.createElement("div");
      Pixel.classList.add("myPixel");
      console.log(colors[myCodeArray[i]]);
      Pixel.style.backgroundColor = colors[myCodeArray[i]];
      // picArea.appendChild(Pixel);
    }
  }
  console.log("checking the myCodeArray", myCodeArray);
}

function colorDeclarationCheck() {
  for (let i = 0; i < myCodeArray.length; i++) {
    if (colors[myCodeArray[i]] != undefined) {
      colorsObj[myCodeArray[i]] = 1;
    }
    if (colors[myCodeArray[i]] == undefined) {
      colorsObj[myCodeArray[i]] = 0;
      //TURN THIS ON TO STOP CREATING PICTURES WITH MISSING PIXELS
      // canUCreate = false;
    }
  }

  for (const [key, value] of Object.entries(colorsObj)) {
    console.log(key, value);
    if (value == 0) missingColors.push(key);
    console.log(missingColors);
  }
  if (missingColors.length > 0) alert(`Missing colors are: ${missingColors}`);
}

function roll() {
  console.log("LETS ROLL");
  breakString();
  colorDeclarationCheck();
  if (canUCreate) {
    createPicture();
    // for (let i = myWidth; i < 310; i + 5) {}
    for (let i = 300; i < 330; i + 5) {}
  } else alert("Missing declaration of colors");
}

function addAColor() {
  console.log("adding a color");
  //This is coming from the input
  const chosenColorNumber = document.getElementById("colorNumber");
  let colorValue = chosenColorNumber.value;

  if (!colors[colorValue]) colors[colorValue] = colorPicker.value;
  else {
    alert("this exists");
    //Deal with this later to add CHANGE feature
    return;
  }

  const definedColor = document.createElement("div");
  //this needs to change in the future
  definedColor.id = myString;
  userscolors.append(definedColor);

  //Creating to p
  const myColorNamelabel = document.createElement("p");
  myColorNamelabel.innerText = "Color number:";
  definedColor.append(myColorNamelabel);
  console.log("====", colorValue);
  // console.log(colors[chosenColorNumber.value]);
  // myColorNamelabel.style.background = colorPicker.value;
  myColorNamelabel.innerText +=
    " " + colorPicker.value + " and the color: " + colorValue;

  const colorDiv = document.createElement("div");
  // colorDiv.style.borderRadius = "50";
  colorDiv.style.backgroundColor = colorPicker.value;
  colorDiv.style.width = "20px";
  colorDiv.style.height = "20px";
  definedColor.append(colorDiv);
}

const singleColorRadio = document.getElementById("singleColor");
const rangeOfColorRadio = document.getElementById("rangeOfColor");

singleColorRadio.addEventListener("click", () => {
  if (rangeOfColorRadio) {
    rangeOfColorRadio.checked = false;
  }
  if (document.getElementById("chooseColorNumber2")) {
    console.log("alksj");
    document.getElementById("chooseColorNumber2").style.display = "none";
  }
});

rangeOfColorRadio.addEventListener("click", () => {
  if (singleColorRadio) {
    singleColorRadio.checked = false;
  }
  if (!iscreateSecondDropdownCreated) {
    iscreateSecondDropdownCreated = true;
  }
});

function init() {
  singleColorRadio.checked = true;
}

init();

// var cnvs = document.getElementById("cnvs"),
//   ctx = cnvs.getContext("2d"),
//   mirror = document.getElementById("mirror");

// cnvs.width = mirror.width = window.innerWidth;
// cnvs.height = mirror.height = window.innerHeight;

// mirror.addEventListener("contextmenu", function (e) {});

// mirror.addEventListener("contextmenu", function (e) {
//   var dataURL = canvas.toDataURL("image/png");
//   mirror.src = dataURL;
// });

// var button = document.getElementById("btn-download");
// button.addEventListener("click", function (e) {
//   var dataURL = canvas.toDataURL("image/png");
//   button.href = dataURL;
// });

// var c = document.getElementById("myCanvas");
// var ctx = c.getContext("2d");
// ctx.fillStyle = "red";
// ctx.fillRect(10, 10, 5, 5);

// function copy() {
//   var imgData = ctx.getImageData(10, 10, 50, 50);
//   ctx.putImageData(imgData, 10, 70);
// }
