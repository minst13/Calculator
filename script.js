const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector(".calculator__keys")



const display = document.querySelector(".calculator__display")
const calculate = (num1, operator, num2) => {
    let result = " "
    const fnum = parseFloat(num1)
    const lnum = parseFloat(num2)

    return operator === "add" ? fnum + lnum : operator === "subtract" ? fnum - lnum : operator === "multiply" ? fnum * lnum : operator === "divide" ? fnum / lnum : result;
}



keys.addEventListener("click", e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayCurrent = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        let siblings = key.parentNode.children;
        for (let i = 0; i < siblings.length; i++) {
            siblings[i].classList.remove('inactive');
        }

        if (!action) {
            if (displayCurrent === "0" ||
                previousKeyType === "operator" ||
                previousKeyType === "calculate"
            ) {
                display.textContent = keyContent //clicked object 
            }
            else {
                display.textContent = displayCurrent + keyContent
            }
            calculator.dataset.previousKeyType = "number"
        }
        if (action === "decimal") {
            if (!displayCurrent.includes(".")) {
                display.textContent = displayCurrent + "." //number + "."
            }
            else if (
                previousKeyType === "operator" ||
                previousKeyType == "calculate"
            ) {
                display.textContent = "0." // 0 as default without any numbers
            }
            calculator.dataset.previousKeyType = "decimal"
        }
        if (
            action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide"
        ) {
            const value_one = calculator.dataset.value_one
            const operator = calculator.dataset.operator
            const value_two = displayCurrent

            if (
                value_one &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
            ) {
                const resultValue = calculate(value_one, operator, value_two)
                display.textContent = resultValue + keyContent;
                calculator.dataset.value_one = resultValue;
            }
            else {
                display.textContent = displayCurrent + keyContent;
                calculator.dataset.value_one = displayCurrent
            }

            key.classList.add("inactive");
            console.log(key, key.dataset.action);
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
        }
        if (action === "add") {
            displayCurrent + "+"
        }

        if (action === "clear") {
            if (key.textContent === "AC") {
                // Full reset (AC pressed)
                calculator.dataset.value_one = "";
                calculator.dataset.operator = "";
                calculator.dataset.previousKeyType = "";
                calculator.dataset.modValue = "";
            } else {
                display.textContent = 0;  // Clear only the display
                key.textContent = "AC";  // Change to AC for full reset
            }
            calculator.dataset.previousKeyType = "clear";
        }

        // Reset "clear" button text if any other button is pressed
        if (action !== "clear") {
            calculator.querySelector("[data-action=clear]").textContent = "CE";
        }

        if (action === "calculate") {
            let value_one = calculator.dataset.value_one
            const operator = calculator.dataset.operator
            const value_two = displayCurrent

            if (value_one) {
                if (previousKeyType === "calculate") {
                    value_one = displayCurrent
                    value_two = calculator.dataset.modValue //carry previous calcuation to next 
                }
                display.textContent = calculate(value_one, operator, value_two)
            }
            calculator.dataset.modValue = value_two
            calculator.dataset.previousKeyType = "calculate"
        }
    }
}
)

