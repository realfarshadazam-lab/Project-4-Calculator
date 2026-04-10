const display = document.getElementById("display");
const buttons = document.querySelector(".calculator-buttons");

let currentValue = "0";
let firstNumber = null;
let operator = null;
let waitingForSecond = false;

function updateDisplay() {
  display.textContent = currentValue;
}

function inputNumber(num) {
  if (waitingForSecond) {
    currentValue = num;
    waitingForSecond = false;
    return;
  }

  if (currentValue === "0") {
    currentValue = num;
  } else {
    currentValue += num;
  }
}

function clearAll() {
  currentValue = "0";
  firstNumber = null;
  operator = null;
  waitingForSecond = false;
}

function backspace() {
  if (currentValue.length === 1) {
    currentValue = "0";
  } else {
    currentValue = currentValue.slice(0, -1);
  }
}

function chooseOperator(op) {
  const input = Number(currentValue);

  if (firstNumber === null) {
    firstNumber = input;
  } else if (operator) {
    const result = calculate(firstNumber, input, operator);
    currentValue = String(result);
    firstNumber = result;
  }

  operator = op;
  waitingForSecond = true;
}

function calculate(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? 0 : a / b;
}

function equals() {
  if (operator === null) return;

  const result = calculate(
    firstNumber,
    Number(currentValue),
    operator
  );

  currentValue = String(result);
  operator = null;
  firstNumber = null;
  waitingForSecond = false;
}

buttons.addEventListener("click", function (e) {
  const target = e.target;

  if (!target.matches("button")) return;

  if (target.dataset.number) {
    inputNumber(target.dataset.number);
    updateDisplay();
    return;
  }

  const action = target.dataset.action;

  if (action === "clear") {
    clearAll();
    updateDisplay();
    return;
  }

  if (action === "backspace") {
    backspace();
    updateDisplay();
    return;
  }

  if (action === "operator") {
    chooseOperator(target.dataset.value);
    updateDisplay();
    return;
  }

  if (action === "equals") {
    equals();
    updateDisplay();
  }
});

updateDisplay();
