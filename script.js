let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
let justCalculated = false;

const screen = document.querySelector(".screen");

document
  .querySelector(".calculator-buttons")
  .addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") {
      return;
    }
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleNumber(numberString) {
  if (justCalculated) {
    buffer = numberString;
    justCalculated = false;
    return;
  }
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      justCalculated = false;
      break;
    case "←":
      if (buffer.length === 1 || buffer === "Error") {
        buffer = "0";
      } else {
        buffer = buffer.slice(0, -1);
      }
      break;
    case "=":
      if (previousOperator === null) {
        break;
      }
      flushOperation(Number(buffer));
      if (isNaN(runningTotal)) {
        showError();
        break;
      }
      previousOperator = null;
      buffer = String(runningTotal);
      runningTotal = 0;
      justCalculated = true;
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
  if (buffer === "Error") {
    return;
  }

  const currentNumber = Number(buffer);

  if (previousOperator === null) {
    runningTotal = currentNumber;
  } else {
    flushOperation(currentNumber);
    if (isNaN(runningTotal)) {
      showError();
      return;
    }
  }

  previousOperator = symbol;
  buffer = "0";
  justCalculated = false;
}

function flushOperation(currentNumber) {
  if (previousOperator === "+") {
    runningTotal += currentNumber;
  } else if (previousOperator === "−") {
    runningTotal -= currentNumber;
  } else if (previousOperator === "×") {
    runningTotal *= currentNumber;
  } else if (previousOperator === "÷") {
    if (currentNumber === 0) {
      runningTotal = NaN;
    } else {
      runningTotal /= currentNumber;
    }
  }
}

function showError() {
  buffer = "Error";
  runningTotal = 0;
  previousOperator = null;
  justCalculated = true;
}
