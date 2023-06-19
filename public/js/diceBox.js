function openBox() {
  document.getElementById("diceBoxEl").style.width = "50%";
  document
    .querySelectorAll("canvas")
    .forEach((el) => (el.style.width = "100%"));
}

/* Close when someone clicks on the "x" */
function closeBox() {
  document.getElementById("diceBoxEl").style.width = "0%";
}
