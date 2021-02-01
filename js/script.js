const colors = {
  0: "#000000",
  1: "#202020",
  2: "#404040",
  3: "#606060",
  4: "#808080",
  5: "#A0A0A0",
  6: "#C0C0C0",
  7: "#D2D2D2",
  8: "#E0E0E0",
  9: "#FFFFFF",
};

const magicButton = document.getElementById("getResult");
let myLength = document.getElementById("length");
const resultsBox = document.getElementsByClassName("results");
let length = 100;
let iscreateSecondDropdownCreated = false;
let myString =
  "523453553235645235543675435564444424552454533353353553534524544355435245534322333323243233232333454344354424323322335424522334334343345553445466335463633552365322336335536556444535334344334342254524434253424522355452432545444443445244422433545252245453543343343462344465245342236324444325443445352233";
let myArray = [];

function stringToArray(txt) {
  myArray = myString.split("");
  return myArray;
}

let myarticle = document.getElementById("article");
function createAPixel(color) {}
let myWidth = 100;

function append() {
  let count = 1;
  while (count < 10) {
    console.log("create newImage", count);
    let newImage = document.createElement("div");
    newImage.classList.add("newImage");
    newImage.style.width = myWidth + "px";
    resultsBox[0].appendChild(newImage);

    for (let i = 0; i < myArray.length; i++) {
      const pixel = document.createElement("div");
      pixel.classList.add("myPixel");
      if (myArray[i] == 0) pixel.id = "color0";
      else if (myArray[i] == 1) pixel.id = "color1";
      else if (myArray[i] == 2) pixel.id = "color2";
      else if (myArray[i] == 3) pixel.id = "color3";
      else if (myArray[i] == 4) pixel.id = "color4";
      else if (myArray[i] == 5) pixel.id = "color5";
      else if (myArray[i] == 6) pixel.id = "color6";
      else if (myArray[i] == 7) pixel.id = "color7";
      else if (myArray[i] == 8) pixel.id = "color8";
      else if (myArray[i] == 9) pixel.id = "color9";
      newImage.appendChild(pixel);
    }
    myWidth += 10;
    count++;
  }
}

function createDropdown() {
  let selectColorValues = [];
  let selectColor = document.createElement("select");
  for (let i = 0; i < 1000; i++) {
    selectColorValues[i] = i;
  }
  for (const val of selectColorValues) {
    let option = document.createElement("option");
    option.value = val;
    option.text = val;
    selectColor.appendChild(option);
  }
  selectColor.style.width = "70px";
  selectColor.id = "chooseColorNumber";
  document.getElementsByClassName("numbers")[0].append(selectColor);
}

function createSecondDropdown() {
  let selectColorValues = [];
  let selectColor = document.createElement("select");
  for (let i = 0; i < 1000; i++) {
    selectColorValues[i] = i;
  }
  for (const val of selectColorValues) {
    let option = document.createElement("option");
    option.value = val;
    option.text = val;
    selectColor.appendChild(option);
  }
  selectColor.style.width = "70px";
  selectColor.id = "chooseColorNumber2";
  document.getElementsByClassName("numbers")[0].append(selectColor);
}

function init() {
  stringToArray();
  getColors();
  createDropdown();
}
let colorColor = [9];

const color0Text = document.getElementById("color0");
const color1Text = document.getElementById("color1");
const color2Text = document.getElementById("color2");
const color3Text = document.getElementById("color3");
const color4Text = document.getElementById("color4");
const color5Text = document.getElementById("color5");
const color6Text = document.getElementById("color6");
const color7Text = document.getElementById("color7");
const color8Text = document.getElementById("color8");
const color9Text = document.getElementById("color9");

const showColor0 = document.getElementsByClassName("showColor0");
const showColor1 = document.getElementsByClassName("showColor1");
const showColor2 = document.getElementsByClassName("showColor2");
const showColor3 = document.getElementsByClassName("showColor3");
const showColor4 = document.getElementsByClassName("showColor4");
const showColor5 = document.getElementsByClassName("showColor5");
const showColor6 = document.getElementsByClassName("showColor6");
const showColor7 = document.getElementsByClassName("showColor7");
const showColor8 = document.getElementsByClassName("showColor8");
const showColor9 = document.getElementsByClassName("showColor9");

let cssColor0 = document.getElementsByClassName("color0");

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
    createSecondDropdown();
    iscreateSecondDropdownCreated = true;
  }
  const chooseColorNumber2 = document.getElementById("chooseColorNumber2");
  if ((chooseColorNumber2.style.display = "none")) {
    chooseColorNumber2.style.display = "block";
  }
});

const boxes = document.querySelectorAll(".box");

function getColors() {
  for (let i = 0; i < 10; i++) {
    boxes[i].style.backgroundColor = colors[i];
    colorColor[i] = document.getElementById(`currentColor${i}`);
    `color${i}Text`.innerText += colors[i];
  }
}

let color = [];

function setColor() {
  let colorName = document.getElementById("colorsDropdown").value;
  let myColorPicker = document.getElementById("colorPicker").value;
  colorName = colorName.toLowerCase();
  let colorNumber = colorName.split("color")[1];

  color[0] = document.querySelectorAll("#color0");
  color[1] = document.querySelectorAll("#color1");
  color[2] = document.querySelectorAll("#color2");
  color[3] = document.querySelectorAll("#color3");
  color[4] = document.querySelectorAll("#color4");
  color[5] = document.querySelectorAll("#color5");
  color[6] = document.querySelectorAll("#color6");
  color[7] = document.querySelectorAll("#color7");
  color[8] = document.querySelectorAll("#color8");
  color[9] = document.querySelectorAll("#color9");

  color[colorNumber].forEach((el) => {
    el.style.backgroundColor = myColorPicker;
  });
}

init();
