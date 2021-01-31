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
// const myimageBox = document.getElementsByClassName("imageBox");
let myLength = document.getElementById("length");
const resultsBox = document.getElementsByClassName("results");
let length = 100;

myLength.addEventListener("change", () => {
  changeSize();
});

function changeSize() {
  length = myLength.value;
  console.log("Changethe size", length);
  console.log(`${length}px`);
  myimageBox[0].setAttribute("style", `width:${length}px`);
}

let myString =
  "523453553235645235543675435564444424552454533353353553534524544355435245534322333323243233232333454344354424323322335424522334334343345553445466335463633552365322336335536556444535334344334342254524434253424522355452432545444443445244422433545252245453543343343462344465245342236324444325443445352233";
let myArray = [];

function stringToArray(txt) {
  myArray = myString.split("");
  return myArray;
}

function getResult() {
  stringToArray();
  console.log("get result clicked", myArray.length);

  while (length < myArray.length / 2) {
    let i = 0;
    console.log("while");
    length += 10;
    const dynamicImageBox = document.createElement("div");
    dynamicImageBox.classList.add();
    dynamicImageBox.id = "imageBox";
    // container.appendChild(dynamicImageBox);
    resultsBox[0].appendChild(dynamicImageBox);
    createImage(i);
  }
}

function createImage(count) {
  myimageBox[0].innerHTML = "";
  stringToArray(myString);
  for (let i = 0; i < myArray.length; i++) {
    createAPixel(myArray[i], count);
  }
}

// const appndButton = document.getElementById("appendButton");
let myarticle = document.getElementById("article");
function createAPixel(color) {
  // console.log("create newImage");
}
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
      // console.log("for newImage");
      // createAPixel(myArray[i]);
      const pixel = document.createElement("div");
      pixel.classList.add("myPixel");
      // console.log(colors[myArray[i]]);
      pixel.style.backgroundColor = colors[myArray[i]];
      newImage.appendChild(pixel);
    }
    myWidth += 10;

    count++;
  }
}

function init() {
  stringToArray();
}

init();
