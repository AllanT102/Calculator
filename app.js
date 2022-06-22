import Stack from "./Stack.js"

const currentText = document.querySelector('.current-text')
const prevText = document.querySelector('.prev-text')
const options = document.querySelectorAll('.data-option')
const clearBtn = document.querySelector('.clear')
const delBtn = document.querySelector('.del')
const equalBtn = document.querySelector('.equal')
const ops = document.querySelectorAll('.operation')
const dotBtn = document.querySelector('.dot')
const negBtn = document.querySelector('.neg')

let answer
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
    prevText.textContent = ''
    expression = ''
    negPressed = false
    negated = false
    canPressNeg = true
    dotPressed = false
})
equalBtn.onclick = () => calculate()
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
            expression += '-'
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

delBtn.onclick = () => {
    currentText.textContent = currentText.textContent.slice(0,-1)
    expression = expression.slice(0,-1)
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

// stack based implementation of calculator

function isOp(c) {
    return c === '+' || c === '-' || c === 'x' || c ==='\u00f7'
}

function isNum(c) {
    return !isNaN(c)
}

// calculates given expression in array format
function calculate() {
    const expressionArr = expression.split(' ')
    convertToPostfix(expressionArr)
    currentText.textContent = answer
    prevText.textContent = expression
}

function operate(v1s, v2s, op) {
    let v1 = Number(v1s)
    let v2 = Number(v2s)
    if (op === '-') return subtract(v1, v2).toFixed(4) * 1;
    if (op === 'x') return multiply(v1, v2).toFixed(4) * 1;
    if (op === '\u00f7') return divide(v1, v2).toFixed(4) * 1;
    if (op === '+') return add(v1, v2).toFixed(4) * 1;
}

function getPrec(op1, op2) {
    if((op1 === 'x' || op1 === '\u00f7') && (op2 === '+' || op2 === '-')) return true
    else if ((op1 === 'x' || op1 === '\u00f7') && (op2 === 'x' || op2 === '\u00f7')) return true
    else if ((op1 === '+' || op1 === '-') && (op2 === '+' || op2 === '-')) return true
    else return false
}

function evaluatePostFix(postfix) {
    let ops = new Stack()
    for(let i = 0; i < postfix.length; i++) {
        if (!isNum(postfix[i])) {
            let y = ops.pop()
            let x = ops.pop()
            ops.push(operate(x, y, postfix[i]))
        } else {
            ops.push(postfix[i])
        }
    }
    answer = ops.pop()
    console.log(answer)
}

function convertToPostfix(arr) {
    let postfix = []
    let ops = new Stack()

    for(let i = 0; i < arr.length; i++) {
        let c = arr[i]
        if (isNum(c)) postfix.push(c)
        else {
            if (ops.isEmpty()) ops.push(c)
            else {
                while (!getPrec(c, ops.peek()) && !ops.isEmpty()) {
                    postfix.push(ops.pop())
                }
                ops.push(c)
            }
        }
    }
    while (!ops.isEmpty()) postfix.push(ops.pop())
    evaluatePostFix(postfix)
}

