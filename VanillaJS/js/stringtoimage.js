let myString = "niso";
const userscolors = document.getElementById("userscolors");
let colors = [];
let myCodeArray = [],
  pixelSize = 10;

function addAColor() {
  console.log("========== Adding a color ==========");
  let chosenColorNumber = document.getElementById("colorNumber");
  chosenColorNumber = chosenColorNumber.value;

  if (!colors[chosenColorNumber]) colors[chosenColorNumber] = colorPicker.value;
  else {
    alert("this exists");
    //Deal with this later to add CHANGE feature
    return;
  }

  const definedColor = document.createElement("div");
  //CHANGE myString
  definedColor.id = myString;
  userscolors.append(definedColor);

  const myColorNamelabel = document.createElement("p");
  myColorNamelabel.innerText = "Color number:";
  definedColor.append(myColorNamelabel);
  myColorNamelabel.innerText +=
    " " + colorPicker.value + " and the color: " + chosenColorNumber;

  const colorDiv = document.createElement("div");
  colorDiv.style.backgroundColor = colorPicker.value;
  colorDiv.style.width = "20px";
  colorDiv.style.height = "20px";
  definedColor.append(colorDiv);
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

function init() {}

init();
