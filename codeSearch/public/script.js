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
