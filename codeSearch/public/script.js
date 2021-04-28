window.onload = function () {
  const forwardCheckbox = document.getElementById("forward");
  const freverseCheckbox = document.getElementById("reverse");
  const allvariationsCheckbox = document.getElementById("all-variations");
  const searchButton = document.getElementById("searchButton");

  let canSearch = false;

  forwardCheckbox.addEventListener("change", () => {
    if (forwardCheckbox.checked == true) {
      console.log("false");
      canSearch = true;
    } else {
      canSearch = false;
    }
    checkCanSearch();
  });

  function checkCanSearch() {
    if (canSearch) searchButton.disabled = false;
    else searchButton.disabled = true;
  }

  checkCanSearch();
};
