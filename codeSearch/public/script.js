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