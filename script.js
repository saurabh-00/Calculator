const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// calculate first and second values depending upon the operater
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber
}

let firstValue = 0;
let operatorValue = '';
let nextValue = false;

function sendInputValue(number) {
    // Replace current display value if first value is entered
    if (nextValue) {
        calculatorDisplay.textContent = number;
        nextValue = false;
    } else {
        // If current display value is 0, replace it with number else add it
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    // If operator pressed, don't add decimal
    if (nextValue) return;
    // If no decimal then add one
    const displayValue = calculatorDisplay.textContent;
    if (!displayValue.includes('.')) {
        calculatorDisplay.textContent = `${displayValue}.`
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators at a time
    if (operatorValue && nextValue) {
        operatorValue = operator;
        return;
    }
    // Assign first value if no value
    if (!firstValue) {
        firstValue = currentValue
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store operator
    nextValue = true;
    operatorValue = operator;
}

// Reset all values and display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    nextValue = false;
    calculatorDisplay.textContent = '0'
}

// Event Listeners for numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendInputValue(inputBtn.value))
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', addDecimal)
    }
})
// Event Listener for clear button 
clearBtn.addEventListener('click', resetAll);