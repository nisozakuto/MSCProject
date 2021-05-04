window.onload = function () {
  const forwardCheckbox = document.getElementById("forward");
  const reverseCheckbox = document.getElementById("reverse");
  const allvariationsCheckbox = document.getElementById("all-variations");
  const searchButton = document.getElementById("searchButton");

  forwardCheckbox.addEventListener("change", () => {
    checkCanSearch();
    if (forwardCheckbox.checked && allvariationsCheckbox.checked) {
      allvariationsCheckbox.checked = false;
    }
  });

  reverseCheckbox.addEventListener("change", () => {
    checkCanSearch();
    if (reverseCheckbox.checked && allvariationsCheckbox.checked) {
      allvariationsCheckbox.checked = false;
    }
  });

  allvariationsCheckbox.addEventListener("change", () => {
    checkCanSearch();
    if (allvariationsCheckbox.checked) {
      if (forwardCheckbox.checked || reverseCheckbox.checked) {
        forwardCheckbox.checked = false;
        reverseCheckbox.checked = false;
      }
    }
  });

  function checkCanSearch() {
    if (
      forwardCheckbox.checked ||
      reverseCheckbox.checked ||
      allvariationsCheckbox.checked
    ) {
      searchButton.disabled = false;
    } else searchButton.disabled = true;
  }

  checkCanSearch();
  let amountOfZeros,isCountingZeros
  let myCodeArray = []
  let code
  const textArea = document.querySelector("textarea");

  

function checkIsThereString() {
  if (myCodeArray.length >= 0) {
    isThereString = true;
  }
  if (myCodeArray.length == 1 && myCodeArray[0] == "") {
    isThereString = false;
  }
}

function setStringLengthText(length) {
  let stringLength = document.getElementById("stringLength");
  stringLength.innerText = `String's length: ${length}`;
}

function breakString() {
  amountOfZeros = 0;
  code = document.getElementById("source").value;
  myCodeArray = code.split(/\n/);

  if (!isCountingZeros) {
    for (let i = 0; i < myCodeArray.length; i++) {
      if (myCodeArray[i] === "0") {
        amountOfZeros++;
        myCodeArray.splice(i, 1);
        i--;
      }
    }
  }
  setStringLengthText(myCodeArray.length);
}

function textAreaFunction() {
  setTimeout(() => {
    breakString();
    document.getElementById("foundZeros").innerText = `Found 0s: ${parseInt(
      amountOfZeros
    )}`;

    setStringLengthText(myCodeArray.length);

    stringColorCheck = [];

    checkIsThereString();
    if (isThereString) {
      checkIsThereString();
      setStringLengthText(myCodeArray.length);
    }
    if (!isThereString) {
      setStringLengthText(0);
    }
  }, 300);
}


textArea.addEventListener("paste", (event) => {
  textAreaFunction();
});

textArea.addEventListener("keydown", (event) => {
  textAreaFunction();
});
};




function lastUpdatedFunction() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let repos = JSON.parse(this.responseText);
      repos.forEach((repo) => {
        if (repo.name == "MSCProject") {
          document.querySelector(
            "footer"
          ).innerText = `An MSC Webpage - Last updated ${new Date(
            repo.updated_at
          )}`;
        }
      });
    }
  };
  xhttp.open("GET", "https://api.github.com/users/nisozakuto/repos", true);
  xhttp.send();
}

function init() {
lastUpdatedFunction()
}

init()