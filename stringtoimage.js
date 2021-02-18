//https://www.geeksforgeeks.org/how-to-show-page-loading-div-until-the-page-has-finished-loading/
const userscolors = document.getElementById("userscolors");
const getColorsFromStorageButton = document.getElementById(
  "getColorsFromStorage"
);
const createImagesButton = document.getElementById("roll");
const inverseCheckbox = document.getElementById("checkbox");
const zeroStatus = document.getElementById("isCountingZeros");
const rangeSelection = document.getElementById("rangeSelection");
const textArea = document.querySelector("textarea");
const singleColor = document.getElementById("singleColor");
const rangeColor = document.getElementById("rangeOfColor");

let colors = [],
  myCodeArray = [],
  myString = "niso",
  pixelSize = 1, //DONT CHANGE THIS VALUE
  canIAddTheRange = true,
  canIAddThisSingle = true,
  countstartWidthValue,
  endWidthValue,
  isPassedRange = false,
  isThereString = false,
  isSavedColorsLoaded = false,
  isWidthSet = false,
  isInverse = false,
  amountOfZeros,
  mycanvas,
  canvasWidth = 1000, //DONT CHANGE THIS VALUE
  canvasHeigth = 1000, //DONT CHANGE THIS VALUE
  imageNumberForThePage,
  isCountingZeros = false,
  startWidth = document.getElementById("startWidth"),
  endWidth = document.getElementById("endWidth"),
  setWidthText = document.getElementById("setWidthText");

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};
function clearYourColorsDOM() {
  document.getElementById("userscolors").innerText = "";
}

function clearResults() {
  alert("Clearing the results");
  document.getElementsByClassName("imagePrint")[0].innerHTML = "";
  colors = [];
  if (document.getElementById("downloadButtons").innerHTML != undefined)
    document.getElementById("downloadButtons").innerHTML = "";
  clearYourColorsDOM();
}

function addColor(number1, hex) {
  if (!colors[number1]) {
    colors[number1] = hex;
    return;
  } else {
    alert("this exists");
    canIAddThisSingle = false;
    //Deal with this later to add CHANGE feature
    return;
  }
}

function addingTheColor(number1, hex, number2) {
  console.log("add the color Func", number2);
  if (number2 == undefined) {
    // Adding only one color
    console.log("add one pic");
    addColor(number1, hex);
  } else if (number2) {
    canIAddTheRange = true;
    // Adding a range of colors
    console.log("add range of pic");
    for (let i = number1; i <= number2; i++) {
      if (colors[i] != undefined || colors[i] != "") {
        canIAddTheRange = false;
      }
    }
    if (canIAddTheRange)
      for (let i = number1; i <= number2; i++) {
        console.log("ekleniyor", i);
        addColor(i, hex);
      }
  }
}

function createDOMForTheColor(number1, colorPickerValue, number2) {
  const definedColor = document.createElement("div");
  //CHANGE myString in the future
  definedColor.id = myString;
  userscolors.append(definedColor);

  if (singleColor.checked == true) {
    const myColorNamelabel = document.createElement("p");
    myColorNamelabel.innerText = "Colors HEX is:";
    definedColor.append(myColorNamelabel);
    myColorNamelabel.innerText +=
      " " + colorPickerValue + " and the color: " + number1;

    const colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = colorPickerValue;
    colorDiv.style.width = "20px";
    colorDiv.style.height = "20px";
    definedColor.append(colorDiv);

    const deleteButton = document.createElement("button");
    deleteButton.style.width = "20px";
    deleteButton.style.height = "20px";
    deleteButton.innerText = "X";
    definedColor.append(deleteButton);

    deleteButton.addEventListener("click", () => {
      console.log("clickeddd");
      alert(`${number1} is deleted`);
      // colors[number1] = "";
      delete colors[number1];
      definedColor.remove();
    });
  } else if (rangeColor.checked == true) {
    const myColorNamelabel = document.createElement("p");
    myColorNamelabel.innerText = "Colors HEX are:";
    definedColor.append(myColorNamelabel);
    myColorNamelabel.innerText += ` ${colorPickerValue} and the color: ${number1} to ${number2}`;

    const colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = colorPickerValue;
    colorDiv.style.width = "20px";
    colorDiv.style.height = "20px";
    definedColor.append(colorDiv);

    const deleteButton = document.createElement("button");
    deleteButton.style.width = "20px";
    deleteButton.style.height = "20px";
    deleteButton.innerText = "X";
    definedColor.append(deleteButton);

    deleteButton.addEventListener("click", () => {
      console.log("clickeddd", colors);
      alert(`${number1} to ${number2} is deleted`);
      for (let index = number1; index <= number2; index++) {
        delete colors[index];
      }
      definedColor.remove();
    });
  }
}

function zeroCheck() {
  if (colors[0] == undefined) {
    isCountingZeros = false;
    zeroStatus.innerText = `Removing 0s from the list`;
  } else {
    isCountingZeros = true;
    zeroStatus.innerText = `Keeping 0s in the list`;
    breakString();
  }
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
    for (let i = firstNumber; i <= secondNumber; i++) {
      console.log(colors[i]);
      if (colors[i] != undefined) {
        console.log(i, colors[i], "179");
        alert(`${i} is already added to your colors`);
        return;
      }
    }
    if (canIAddTheRange) {
      console.log("sjaslk");
      for (let i = firstNumber; i <= secondNumber; i++) {
        addingTheColor(i, colorPicker.value);
      }
      createDOMForTheColor(firstNumber, colorPicker.value, secondNumber);
      console.log("createDOM fin");
      // const deleteButton = document.createElement("button");
      // deleteButton.style.width = "20px";
      // deleteButton.style.height = "20px";
      // deleteButton.innerText = "X";
      // definedColor.append(deleteButton);

      // deleteButton.addEventListener("click", () => {
      //   console.log("clickeddd");
      //   alert(`${number1} is deleted`);
      //   colors.splice(number1, 1);
      //   definedColor.remove();
      // });
      //ADD A DELETE BUTTON HERE FOR A RANGE

      // const definedColor = document.createElement("div");
      // definedColor.id = myString;
      // userscolors.append(definedColor);

      // const myColorNamelabel = document.createElement("p");
      // myColorNamelabel.innerText = "Colors HEX are: ";
      // definedColor.append(myColorNamelabel);
      // myColorNamelabel.innerText += ` ${colorPicker.value} and the color: ${firstNumber} ${secondNumber}`;

      // const colorDiv = document.createElement("div");
      // colorDiv.style.backgroundColor = colorPicker.value;
      // colorDiv.style.width = "20px";
      // colorDiv.style.height = "20px";
      // definedColor.append(colorDiv);
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
    } else {
      alert("This color is already in your list");
    }
  } else if (rangeColor.checked == true) {
    console.log("add a range");
    addARangeOfColor();
  }
  zeroCheck();
}
// ADD A COLOR FINISHED

function breakString() {
  amountOfZeros = 0;
  let code = document.getElementById("string").value;
  myCodeArray = code.split(/\n/);

  if (!isCountingZeros) {
    for (var i = 0; i < myCodeArray.length; i++) {
      if (myCodeArray[i] === "0") {
        amountOfZeros++;
        myCodeArray.splice(i, 1);
        i--;
      }
    }
  }
  document.getElementById("foundZeros").innerText = `Found 0s: ${parseInt(
    amountOfZeros
  )}`;
}

function createPicture(rowLength) {
  let canvasNumberh2 = document.createElement("h2");
  canvasNumberh2.innerText = `Image number: ${imageNumberForThePage} & Width is: ${rowLength}`;
  canvasNumberh2.id = "canvasH2";

  let canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeigth;
  let line, column;

  if (isInverse) {
    console.log("inverse creation");
    (line = 0), (column = rowLength);

    canvas.style.border = "1px solid black";
    var ctx = canvas.getContext("2d");

    // ADDING PIXELS
    for (let i = 0; i < myCodeArray.length; i++) {
      column -= pixelSize;
      ctx.fillStyle = colors[myCodeArray[i]];
      ctx.fillRect(column, line, pixelSize, pixelSize);
      if (column <= 0) {
        line += pixelSize;
        column = rowLength;
      }
    }
  } else {
    column = line = 0;

    canvas.style.border = "1px solid black";
    var ctx = canvas.getContext("2d");

    //ADDING PIXELS
    for (let i = 0; i < myCodeArray.length; i++) {
      ctx.fillStyle = colors[myCodeArray[i]];
      ctx.fillRect(column, line, pixelSize, pixelSize);
      column += pixelSize;

      if (i >= rowLength && i % rowLength == 0) {
        line += pixelSize;
        column = 0;
      }
    }
  }

  //These two lines are same for both inverse and normal
  const imagePrint = document.getElementsByClassName("imagePrint");
  imagePrint[0].append(canvasNumberh2);
  imagePrint[0].append(canvas);

  document.querySelector("#loader").style.display = "none";
  document.querySelector("body").style.visibility = "visible";
}

function roll() {
  //First Check is passed range
  if (isPassedRange && isThereString) {
    console.log("LETS ROLL");
    zeroCheck();
    imageNumberForThePage = 1;
    let stringLength = document.getElementById("stringLength");
    stringLength.innerText = `String's length is ${myCodeArray.length}`;

    for (let index = startWidthValue; index <= endWidthValue; index++) {
      setTimeout(() => {
        createPicture(index);
        imageNumberForThePage++;
      }, 1000);
    }

    let resultAmount = endWidthValue - startWidthValue;
    let startWidthValueForDownload = startWidthValue;
    setTimeout(() => {
      mycanvas = document.querySelectorAll("canvas");
      if (resultAmount == 0) resultAmount = 1;
      for (let i = 0; i < resultAmount; i = i + 10) {
        let downloadButton = document.createElement("button");
        document.getElementById("downloadButtons").append(downloadButton);
        downloadButton.innerText = `Download ${i + 1} to ${i + 10}`;
        downloadButton.addEventListener("click", () => {
          let index = i;
          for (index; index < i + 10; index++) {
            var downloadUrl = mycanvas[index].toDataURL("image/png");
            var a = document.createElement("a");
            a.href = downloadUrl;
            a.target = "_parent";
            if ("download" in a) {
              a.download = `File_${
                index + 1
              }_Width:${startWidthValueForDownload}`;
              startWidthValueForDownload++;
            }
            (document.body || document.documentElement).appendChild(a);
            if (a.click) {
              a.click(); // The click method is supported by most browsers.
            }
            a.parentNode.removeChild(a);
          }
        });
      }
    }, 3000);
  } else {
    alert("set the Range and enter an input");
  }
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const tryme = async () => {
  mycanvas = document.querySelectorAll("canvas");
  for (let index = 0; index < mycanvas.length; index++) {
    console.log("for loop", index);
    await sleep(1000);
    var downloadUrl = mycanvas[index].toDataURL("image/png");
    var a = document.createElement("a");
    a.href = downloadUrl;
    a.target = "_parent";
    if ("download" in a) {
      a.download = `File_${index + 1}`;
    }
    (document.body || document.documentElement).appendChild(a);
    if (a.click) {
      a.click(); // The click method is supported by most browsers.
    }
    a.parentNode.removeChild(a);
  }
};

function save() {
  let result = confirm("Are you sure you want to save?");
  if (result) {
    if (colors.length == 0) alert("Please first add colors");
    else localStorage.setItem("colors", JSON.stringify(colors));
  } else {
    console.log("Was not saved");
  }
}
function getColorsFunction() {
  isSavedColorsLoaded = true;
  colors = localStorage.getItem("colors");
  colors = JSON.parse(colors);
  clearYourColorsDOM();

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

        const deleteButton = document.createElement("button");
        deleteButton.style.width = "20px";
        deleteButton.style.height = "20px";
        deleteButton.innerText = "X";
        definedColor.append(deleteButton);

        deleteButton.addEventListener("click", () => {
          console.log("clickeddd");
          alert(`${i} is deleted`);
          // colors[i] = "";
          delete colors[i];
          definedColor.remove();
        });
      }
    }
  }
}
function getColorsFromStorage() {
  let result = true;
  if (colors.length > 0) {
    result = confirm("Do you want to overwrite your current colors?");
  }
  if (result && !isSavedColorsLoaded) {
    getColorsFunction();
  } else {
    //DONT DO ANYTHING
  }
  if (isSavedColorsLoaded) {
    getColorsFromStorageButton.disabled = true;
  }
}

//RADIO BUTTONS START
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

// RANGE SET
function setRangeWidth() {
  startWidthValue = parseInt(startWidth.value, 10);
  if (rangeSelection.checked) {
    setWidthText.innerText = `Set width is ${startWidthValue}`;
    endWidthValue = startWidthValue;
    isWidthSet = true;
    createImagesButton.disabled = false;
    return (isPassedRange = true);
  } else {
    endWidthValue = parseInt(endWidth.value, 10);
    if (startWidthValue >= endWidthValue) {
      alert("Start width can not be greater or equal than end width");
      startWidthValue = endWidthValue;
      return (isPassedRange = false);
    } else {
      setWidthText.innerText = `Set width is between ${startWidthValue} - ${endWidthValue}`;
      isWidthSet = true;
      createImagesButton.disabled = false;
      return (isPassedRange = true);
    }
  }
}
function singleDownload() {
  let canvasToDownload = document.getElementById("singleImageDownloadInput")
    .value;
  let myCanvases = document.querySelectorAll("canvas");

  var downloadUrl = myCanvases[canvasToDownload - 1].toDataURL("image/png");
  var a = document.createElement("a");
  a.href = downloadUrl;
  a.target = "_parent";
  if ("download" in a) {
    a.download = "File_" + canvasToDownload;
  }
  (document.body || document.documentElement).appendChild(a);
  if (a.click) {
    a.click(); // The click method is supported by most browsers.
  }
  a.parentNode.removeChild(a);
}
// RANGE SET FINISHED

function checkInverse() {
  if (inverseCheckbox.checked) isInverse = true;
  else isInverse = false;
}

function checkRangeOrSinglePicture() {
  if (rangeSelection.checked) {
    endWidth.disabled = true;
  } else endWidth.disabled = false;
}

textArea.addEventListener("input", (event) => {
  setTimeout(() => {
    breakString();
    stringLength.innerText = `String's Length is: ${myCodeArray.length}`;
    if (myCodeArray.length >= 0) isThereString = true;
  }, 300);
});

// getColorsFromStorageButton.addEventListener("click", () => {
//   if (!isSavedColorsLoaded) {
//     getColorsFromStorage();
//   }
//   if (isSavedColorsLoaded) {
//     getColorsFromStorageButton.disabled = true;
//   }
// });

rangeSelection.addEventListener("click", () => {
  checkRangeOrSinglePicture();
});

inverseCheckbox.addEventListener("change", () => {
  checkInverse();
});

function init() {
  inverseCheckbox.checked = true;
  singleColor.checked = true;
  document.getElementById("colorNumber2").disabled = true;
  createImagesButton.disabled = true;
  checkInverse();
}

init();
