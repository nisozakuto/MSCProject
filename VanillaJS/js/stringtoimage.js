let myString = "niso";
const userscolors = document.getElementById("userscolors");
let colors = [];
let myCodeArray = [];

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

function createPicture(w) {
  let j = 0;
  var canvas = document.createElement("canvas");
  canvas.style.width = "300";
  canvas.style.height = "300";

  var ctx = canvas.getContext("2d");
  for (let i = 0; i < myCodeArray.length; i++) {
    ctx.fillStyle = colors[myCodeArray[i]];
    if (i % w == 0) {
      j = j + 5;
      k = 0;
    } else {
      k++;
    }
    ctx.fillRect(k, j, 5, 5);
  }
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
  //   createPicture();

  //   for (let i = 100; i < 330; i = i + 5) {
  //     createPicture(i);
  //   }

  for (let i = 100; i < 330; i++) {
    createPicture(i);
  }
  //   if (canUCreate) {
  //     createPicture();
  //     // for (let i = myWidth; i < 310; i + 5) {}
  //     for (let i = 300; i < 330; i + 5) {}
  //   } else console.log("MISSING COLORS.");
}

function init() {}

init();
