// Helper Functions
const add = function(a, b) {
  return a + b;
};

const subtract = function(a, b) {
  return a - b;
};

const multiply = function(a, b) {
  return a * b;
};

const divide = function(a, b) {
    if (b === 0) {
        return "Error: Cannot Divide by 0";
    }
    return a / b;
}

function isDigit(char) {
  return /\d/.test(char);
}

function isOperator(str) {
    return str === "+" ||
        str === "-" ||
        str === "*" ||
        str === "/";
}

function operate(operandA, operandB, operator) {
    // Parse operands to floats
    operandA = parseFloat(operandA);
    operandB = parseFloat(operandB);

    if (operator === "+") {
        return String(add(operandA, operandB));
    }
    else if (operator === "-") {
        return String(subtract(operandA, operandB));
    }
    else if (operator === "*") {
        return String(multiply(operandA, operandB));
    }
    else if (operator === "/") {
        return String(divide(operandA, operandB));
    }
}

function displayCurrentInput() {
    display.textContent = `${operandA} ${operator} ${operandB}`;
}

// Initialize page elements
const display = document.querySelector("#display");
const calculatorDiv = document.querySelector("#calculator");

// Initialize variables to keep track of what has been input
let clickedButtonValue = "";
let operandA = "";
let operandB = "";
let operator = "";


calculatorDiv.addEventListener("click", (event) => {

    clickedButtonValue = event.target.dataset.value;

    if (isDigit(clickedButtonValue)) {
        if (!operator && !operandB) {
            operandA += clickedButtonValue;
            displayCurrentInput();
        }
        else {
            operandB += clickedButtonValue;
            displayCurrentInput();
        }
    }
    else if (clickedButtonValue === ".") {
        if (operandA && !operator && !operandA.includes(".")) {
            operandA += clickedButtonValue;
            displayCurrentInput();
        }
        else if (operandB && !operandB.includes(".")) {
            operandB += clickedButtonValue;
            displayCurrentInput();
        }
    }
    else if (isOperator(clickedButtonValue)) {
        if (operandA && !operandB) {
            operator = clickedButtonValue;
            displayCurrentInput();
        }
        else if (operandA && operator && operandB) {
            operandA = operate(operandA, operandB, operator);
            operator = clickedButtonValue;
            operandB = "";
            displayCurrentInput();
        }
    }
    else if (clickedButtonValue === "=") {
        if (operandA && operator && operandB) {
            operandA = operate(operandA, operandB, operator);
            operator = "";
            operandB = "";
            console.log(operandA);
            displayCurrentInput();
        }
    }
    else if (clickedButtonValue === "AC") {
        operandA = "";
        operator = "";
        operandB = "";
        displayCurrentInput();
    }
    else if (clickedButtonValue === "DEL") {
        if (operandB) {
            operandB = operandB.slice(0, -1);
            displayCurrentInput();
        }
        else if (operator) {
            operator = "";
            displayCurrentInput();
        }
        else if (operandA) {
            operandA = operandA.slice(0, -1);
            displayCurrentInput();
        }
    }
});
