let iscreateSecondDropdownCreated = false;
let myString = "niso";
let myArray = [];
let colors = [];
//"523453553235645235543675435564444424552454533353353553534524544355435245534322333323243233232333454344354424323322335424522334334343345553445466335463633552365322336335536556444535334344334342254524434253424522355452432545444443445244422433545252245453543343343462344465245342236324444325443445352233";
let myCode;
let myCodeArray = [];

let myWidth = 100;

const userscolors = document.getElementById("userscolors");
const colorPicker = document.getElementById("colorPicker");
const string = document.getElementById("string");
const myArticleArea = document.getElementById("article");
const imagePrint = document.getElementsByClassName("imagePrint");

// function readTheNumber(number) {
//   if (number == 0) return "zero";
//   else if (number == 1) return "one";
//   else if (number == 2) return "two";
//   else if (number == 3) return "three";
//   else if (number == 4) return "four";
//   else if (number == 5) return "five";
//   else if (number == 6) return "six";
//   else if (number == 7) return "seven";
//   else if (number == 8) return "eight";
//   else if (number == 9) return "nine";
//   else if (number == 10) return "ten";
//   //Continue....
// }

function breakString() {
  code = document.getElementById("string").value;
  console.log(code);
  myCodeArray = code.split(/\n/);
  console.log(myCodeArray);
}
function createPixel(c) {
  const Pixel = document.createElement("div");
  Pixel.classList.add("myPixel");
  // console.log(readTheNumber(c));
  Pixel.style.backgroundColor = colors[c];
  imagePrint[0].appendChild(Pixel);
}

function createPicture() {
  console.log("Creating the picture");
  //If 0 doesnt have color skip 0
  for (let i = 0; i < myCodeArray.length; i++) {
    if (myCodeArray[i] == 0 && colors[0] == null) {
      console.log("0 spotted skipping", i);
    } else {
      console.log("Creating pixel");
      createPixel(myCodeArray[i]);
    }
  }
  console.log("checking the myCodeArray", myCodeArray);
}

function roll() {
  console.log("LETS ROLL");
  breakString();
  createPicture();
}

function addAColor() {
  //This is coming from the input
  const chosenColorNumber = document.getElementById("colorNumber");

  if (!colors[chosenColorNumber.value])
    colors[chosenColorNumber.value] = colorPicker.value;
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

  console.log("====", chosenColorNumber.value);

  // console.log(colors[chosenColorNumber.value]);
  // myColorNamelabel.style.background = colorPicker.value;
  myColorNamelabel.innerText +=
    " " + colorPicker.value + " and the color: " + chosenColorNumber.value;

  const colorDiv = document.createElement("div");
  // colorDiv.style.borderRadius = "50";
  colorDiv.style.backgroundColor = colorPicker.value;
  colorDiv.style.width = "20px";
  colorDiv.style.height = "20px";
  definedColor.append(colorDiv);
}

function append() {
  // let count = 1;
  // while (count < 10) {
  //   let newImage = document.createElement("div");
  //   newImage.classList.add("newImage");
  //   newImage.style.width = myWidth + "px";
  //   resultsBox[0].appendChild(newImage);
  //   for (let i = 0; i < myArray.length; i++) {
  //     const pixel = document.createElement("div");
  //     pixel.classList.add("myPixel");
  //     if (myArray[i] == 0) pixel.id = "color0";
  //     else if (myArray[i] == 1) pixel.id = "color1";
  //     else if (myArray[i] == 2) pixel.id = "color2";
  //     else if (myArray[i] == 3) pixel.id = "color3";
  //     else if (myArray[i] == 4) pixel.id = "color4";
  //     else if (myArray[i] == 5) pixel.id = "color5";
  //     else if (myArray[i] == 6) pixel.id = "color6";
  //     else if (myArray[i] == 7) pixel.id = "color7";
  //     else if (myArray[i] == 8) pixel.id = "color8";
  //     else if (myArray[i] == 9) pixel.id = "color9";
  //     newImage.appendChild(pixel);
  //   }
  //   myWidth += 10;
  //   count++;
  // }
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

function init() {
  createDropdown();
  singleColorRadio.checked = true;
}

init();
