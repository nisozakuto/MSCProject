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
const myimageBox = document.getElementsByClassName("imageBox");

let length = 30;
let myString =
  "523453553235645235543675435564444424552454533353353553534524544355435245534322333323243233232333454344354424323322335424522334334343345553445466335463633552365322336335536556444535334344334342254524434253424522355452432545444443445244422433545252245453543343343462344465245342236324444325443445352233";
let myArray = [];

function stringToArray(txt) {
  myArray = myString.split("");
}

function createAPixel(color) {
  console.log(colors[color]);
  const pixel = document.createElement("div");
  pixel.classList.add("myPixel");
  pixel.style.backgroundColor = colors[color];

  myimageBox[0].appendChild(pixel);
}

function getResult() {
  stringToArray(myString);
  for (let i = 0; i < myArray.length; i++) {
    createAPixel(myArray[i]);
  }
}
