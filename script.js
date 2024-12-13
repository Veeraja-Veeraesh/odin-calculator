// Constants for default states
const DEFAULT_EXPRESSION = "0";
const DEFAULT_SOLUTION = "&nbsp;";

// State variables
let currentExpression = DEFAULT_EXPRESSION;
let currentSolution = DEFAULT_SOLUTION;
let operand1 = null;
let operand2 = null;
let operator = null;
let decimalUsed = false;

// DOM element references
const divExpression = document.querySelector("#expression");
const divSolution = document.querySelector("#solution");
const btnNumbers = document.querySelectorAll(".number");
const btnOperators = document.querySelectorAll(".operator");
const btnEquals = document.querySelector("#equals");
const btnAllClear = document.querySelector("#allclear");
const btnBackspace = document.querySelector("#backspace");
const btnDecimal = document.querySelector("#decimal");

/**
 * Updates the current expression displayed on the calculator.
 * @param {string} newExpression - The new expression to set.
 */
function updateExpression(newExpression) {
    currentExpression = newExpression;
    divExpression.innerText = newExpression;
}

/**
 * Updates the current solution displayed on the calculator.
 * @param {string} newSolution - The new solution to set.
 */
function updateSolution(newSolution) {
    currentSolution = newSolution;
    divSolution.innerHTML = newSolution;
}

/**
 * Solves the given mathematical operation.
 * @param {string} op1 - The first operand.
 * @param {string} op2 - The second operand.
 * @param {string} op - The operator.
 * @returns {number|string|undefined} - The solution or undefined for invalid operations.
 */
function solve(op1, op2, op) {
    const num1 = parseFloat(op1);
    const num2 = parseFloat(op2);

    switch (op) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "x": return num1 * num2;
        case "/":
            if (num2 === 0) {
                alert("Division by zero is not allowed.");
                return undefined;
            }
            return num1 / num2;
        case "%":
            if (num2 === 0) {
                alert("Division by zero is not allowed.");
                return undefined;
            }
            return num1 % num2;
        default:
            return undefined;
    }
}

// Event listeners for number buttons
btnNumbers.forEach((btn) => {
    btn.addEventListener("click", () => {
        setTimeout(() => {
            if (divExpression.innerText === DEFAULT_EXPRESSION) {
                updateExpression(btn.innerText);
            } else {
                updateExpression(divExpression.innerText + btn.innerText);
            }
        }, 50);
    });
});

// Event listeners for operator buttons
btnOperators.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.id !== "equals") {
            if (!operand1) {
                operand1 = divExpression.innerText;
            } else {
                operand2 = divExpression.innerText;
            }
            operator = btn.innerText;
            updateExpression(DEFAULT_EXPRESSION);
            decimalUsed = false;
        }
    });
});

// Event listener for equals button
btnEquals.addEventListener("click", () => {
    if (!operand1) {
        operand1 = divExpression.innerText;
        updateSolution(operand1);
    } else {
        operand2 = divExpression.innerText;
        let solution = solve(operand1, operand2, operator);
        if (solution !== undefined) {
            solution = Number.isInteger(solution) ? solution : solution.toFixed(4);
            updateSolution(solution.toString());
            updateExpression(DEFAULT_EXPRESSION);
            operand1 = solution.toString();
            operand2 = null;
        }
    }
    decimalUsed = false;
});

// Event listener for all clear button
btnAllClear.addEventListener("click", () => {
    operand1 = null;
    operand2 = null;
    operator = null;
    updateExpression(DEFAULT_EXPRESSION);
    updateSolution(DEFAULT_SOLUTION);
    decimalUsed = false;
});

// Event listener for backspace button
btnBackspace.addEventListener("click", () => {
    const expression = divExpression.innerText;
    if (expression.length > 1) {
        updateExpression(expression.slice(0, -1));
    } else {
        updateExpression(DEFAULT_EXPRESSION);
    }
});

// Event listener for decimal button
btnDecimal.addEventListener("click", () => {
    if (!decimalUsed) {
        updateExpression(divExpression.innerText + ".");
        decimalUsed = true;
    }
});
