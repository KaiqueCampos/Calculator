let operationResult = 0;
let screenNumbers = "0";
let previousOperator;

const calcScreen = document.querySelector(".calc-screen");
const larrButton = document.querySelector(".larr");

function buttonClick(value) {
  if (isNaN(value)) {
    handledSymbol(value);
  } else {
    if (previousOperator === "=") {
      return;
    }

    handledNumber(value);
  }

  calcScreen.innerText = screenNumbers;
}

function handledSymbol(symbol) {
  switch (symbol) {
    case "C":
      previousOperator = null;
      screenNumbers = "0";
      operationResult = 0;

      if (larrButton.disabled === true) {
        larrButton.disabled = false;
      }
      break;

    case "←":
      if (screenNumbers.length === 1) {
        screenNumbers = "0";
      } else {
        screenNumbers = screenNumbers.slice(0, -1);
      }
      break;

    case "=":
      if (previousOperator === null) {
        return;
      }

      flushOperator(parseInt(screenNumbers));
      previousOperator = "=";
      screenNumbers = operationResult;
      operationResult = 0;

      larrButton.disabled = true;
      break;

    case "÷":
    case "×":
    case "−":
    case "+":
      handleMath(symbol);
      if (larrButton.disabled === true) {
        larrButton.disabled = false;
      }
      break;
  }
}

function handleMath(symbol) {
  if (screenNumbers === "0") {
    return;
  }

  const intScreenNumbers = parseInt(screenNumbers);

  if (operationResult === 0) {
    operationResult = intScreenNumbers;
  } else {
    flushOperator(intScreenNumbers);
  }

  previousOperator = symbol;
  screenNumbers = "0";
}

function handledNumber(numberString) {
  if (screenNumbers === "0") {
    screenNumbers = numberString;
  } else {
    screenNumbers += numberString;
    larrButton.disabled = false;
  }
}

function flushOperator(intScreenNumbers) {
  if (previousOperator === "+") {
    operationResult += intScreenNumbers;
  } else if (previousOperator === "−") {
    operationResult -= intScreenNumbers;
  } else if (previousOperator === "×") {
    operationResult *= intScreenNumbers;
  } else if (previousOperator === "÷") {
    operationResult /= intScreenNumbers;
  }
}

function init() {
  console.log(previousOperator);

  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);

      if(event.target.innerText === "="){
        document.querySelector('.equals').disabled = true;
      } else {
        document.querySelector('.equals').disabled = false;
      }
    });
}

init();
