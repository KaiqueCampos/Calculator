let runningTotal = 0;
let buffer = "0";
let previousOperator;

const calcScreen = document.querySelector(".calc-screen");
const larrButton = document.querySelector(".larr");

function buttonClick(value) {
  if (isNaN(value)) {
    handledSymbol(value);
  } else {
    handledNumber(value);
  }

  calcScreen.innerText = buffer;
}

function handledSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.slice(0, -1);
      }
      break;

    case "=":
      if (previousOperator == null) {
        return;
      }

      flushOperator(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;

      larrButton.disabled = true;
      break;

    case "÷":
    case "×":
    case "−":
    case "+":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }

  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperator(intBuffer);
  }

  previousOperator = symbol;
  buffer = "0";
}

function handledNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
    larrButton.disabled = false;
  }
}

function flushOperator(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "−") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= intBuffer;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
