const currentText = document.querySelector('.current-text')
const prevText = document.querySelector('.prev-text')
const options = document.querySelectorAll('.data-option')
const clearBtn = document.querySelector('.clear')
const delBtn = document.querySelector('.del')
const equalBtn = document.querySelector('.equal')
const ops = document.querySelectorAll('.operation')
const dotBtn = document.querySelector('.dot')
const negBtn = document.querySelector('.neg')


let expression = ''
// keep track of whether or not a dot can be pressed
let dotPressed = false
let operatorPresed = false
let numPressed = false

let negPressed = false
let negated = false
let canPressNeg = true

// things to keep track of 
// division by 0

// MODIFIES: Adds event listeners to number buttons
function addOptionListeners() {
    for (let i = 0; i < options.length; i++) {
        changeTextButtons(i)
        addNumToggle(i)
    }
}

// EFFECTS: changes text when buttons are pressed
function changeTextButtons(idx) {
    options[idx].addEventListener('click', e => {
        currentText.textContent += e.target.textContent
        expression += e.target.textContent;
        console.log(e.target.textContent)
    });
}

// EFFECTS: toggles operator pressed so that once number is pressed, an operator can be pressed
function addNumToggle(idx) {
    options[idx].addEventListener('click', e => {
        operatorPresed = false
        canPressNeg = false
    });
}

// EFFECTS: adds spacing before and after operator
function addSpacingOps() {
    for (let i = 0; i < ops.length; i++) {
        ops[i].addEventListener('click', e => {
            if (!operatorPresed) {
                currentText.textContent += ' ' + e.target.textContent + ' '
                expression += ' ' + e.target.textContent + ' '
                operatorPresed = true
                dotPressed = false
                canPressNeg = true
            }
        });
    }
}

clearBtn.addEventListener('click', () => {
    currentText.textContent = ''
    expression = ''
    negPressed = false
    negated = false
})
equalBtn.onclick = tryCalculate
dotBtn.onclick = () => {
    if (!dotPressed) {
        currentText.textContent += '.'
        expression += '.'
        dotPressed = true
    }
}
negBtn.onclick = () => {
    if (canPressNeg) {
        if (!negated) {
            currentText.textContent += '-'
            expression += '/-'
            negated = true
            negPressed = true
        } else {
            negated = false
            if (negPressed) {
                currentText.textContent = currentText.textContent.slice(0,-1)
                expression = expression.slice(0,-2)
            }
        }
    }
}

addOptionListeners();
addSpacingOps();



const add = function(x, y) {
    return x + y
};

const subtract = function(x, y) {
    return x - y
};

const divide = function(x, y) {
    return x / y;
}

const multiply = function(x, y) {
    return x * y;
}

// window.onload = function() {
//     addButtonListeners();
// }

// stack based implementation of calculator

function tryCalculate() {
    !isNaN(expression[expression.length-1]) ? calculate(expression) : alert('must enter number');
}

// calculates given expression in array format
function calculate(arr) {
    const expressionArr = arr.split(' ')
    console.log(expressionArr)
}

function isOp(c) {
    return c === '+' || c === '-' || c === 'x' || c ==='\u00f7'
}

function isNum(c) {
    return !isNaN(c)
}

function operate(v1, v2, op) {
    if (op === '+') return add(v1, v2)
    if (op === '-') return subtract(v1, v2)
    if (op === 'x') return multiply(v1, v2)
    if (op === '\u00f7') return divide(v1, v2)
}