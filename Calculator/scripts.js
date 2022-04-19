let displayNumber = "";
let memoryNumber = "";
let operation = "";

let clear = () => {
  result = "";
  clearOperation();
  updateDisplay(displayNumber);
};

let sum = () => {
  operation = "sum";
  storeNumberToMemory();
};

let sub = () => {
  operation = "sub";
  storeNumberToMemory();
};

let storeNumberToMemory = () => {
  memoryNumber = displayNumber;
  displayNumber = "";
  updateDisplay(displayNumber);
};

let displayResult = (result) => {
  updateDisplay(result);
  clearOperation();
};

let clearOperation = () => {
  displayNumber = "";
  memoryNumber = "";
  operation = "";
};

let calculate = () => {
  let result;
  switch (operation) {
    case "sum":
      result = +memoryNumber + +displayNumber;
      displayResult(result);
      break;

    case "sub":
      result = +memoryNumber - +displayNumber;
      displayResult(result);
      break;

    default:
      return;
  }
};

let appendNumber = (inputNumber) => {
  result = "";
  displayNumber += inputNumber;
  updateDisplay(displayNumber);
};

let updateDisplay = (numberToDisplay) => {
  console.log(numberToDisplay);
  document.querySelector("#result").value = numberToDisplay;
};

let handleKeyboardEvents = () => {
  document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
      case 13:
        calculate();
        break;

      case 107:
        sum();
        break;

      case 109:
        sub();
        break;

      default:
        return;
    }
  });
};

let handleOperationEvents = () => {
  document.querySelector(".operation-clear").addEventListener("click", clear);
  document.querySelector(".operation-sum").addEventListener("click", sum);
  document.querySelector(".operation-sub").addEventListener("click", sub);
  document
    .querySelector(".operation-calculate")
    .addEventListener("click", calculate);
};

let handleNumberButtonsEvents = () => {
  let numberButtons = document.querySelectorAll(".number-input");
  for (i = 0; i < numberButtons.length; i++) {
    let num = numberButtons[i];
    num.addEventListener("click", () => {
      appendNumber(num.value);
    });
  }
};

let handleEvents = (() => {
  handleOperationEvents();
  handleNumberButtonsEvents();
  handleKeyboardEvents();
})();
