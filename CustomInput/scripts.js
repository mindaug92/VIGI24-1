let container = document.querySelector(".input-container");
let inputList = container.querySelectorAll(".custom-input");

let setActiveInputStyle = () => {
  for (let i = 0; i < inputList.length; i++) {
    let input = inputList[i];
    let radioInput = input.querySelector("input[type='radio']");
    if (radioInput.checked) {
      input.style.color = "blue";
      input.style.backgroundColor = "violet";
      input.style.fontWeight = "bold";
    } else {
      input.style.color = "";
      input.style.backgroundColor = "";
      input.style.fontWeight = "";
    }
  }
};

let makeInputClickable = (() => {
  for (let i = 0; i < inputList.length; i++) {
    let input = inputList[i];
    input.addEventListener("click", () => {
      let radioInput = input.querySelector("input[type='radio']");
      radioInput.addEventListener("click", (e) => e.stopPropagation());
      radioInput.checked = true;
      setActiveInputStyle();
    });
  }
})();
