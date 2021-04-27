let darkMode = localStorage.getItem("darkMode");
const darkModeToggleButton = document.querySelector(".dark_div_btn");

const enableDarkMode = () => {
    // Add Dark class to the body
    document.body.classList.add("dark-mode");
    // Update dark mode in the localStorage
    localStorage.setItem("darkMode", "enabled");
}

const disableDarkMode = () => {
    // Remove Dark calss to the body
    document.body.classList.remove("dark-mode");
    // Update dark mode in the localStorage
    localStorage.setItem("darkMode", null);
}

// To know dark was enabled or disabled when page is realoding
if( darkMode === "enabled"){
    enableDarkMode();
}

darkModeToggleButton.addEventListener("click", () => {
    // EveryTime we click on the button we have to update darkMode variable.
    darkMode = localStorage.getItem("darkMode");
    if( darkMode !== "enabled"){
        enableDarkMode();
    }else{
        disableDarkMode();
    }
});

// Code For Calculator 


class Calculator{
    constructor(previousDisplay, currentDisplay){
        this.previousDisplay = previousDisplay;
        this.currentDisplay = currentDisplay;
        this.clear();
    }
    clear(){
        this.currentOperand = "";
        this.previousOperand = ""
        this.oper = undefined
    }
    delete(){
        if(this.currentOperand === ""){
            this.currentOperand = this.previousOperand;
            this.previousOperand = "";
            this.oper = undefined;
        }else{
            this.currentOperand = this.currentOperand.toString().slice(0, -1);

        }
    }
    equalButton(){
        if(this.previousOperand === "") return
        if(this.currentOperand === ""){
            this.currentOperand = this.previousOperand;
            this.previousOperand = "";
            this.oper = undefined;
        }
    }
    appendNumber(number){
        if(number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()  ;
    }
    operation(oper){
        if(this.currentOperand === "") return
        if(this.previousOperand !== ""){
            this.compute();
        }
        this.oper = oper;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ""
        
    }
    compute(){
        let computation;
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.oper){
            case "+":
                computation = prev + curr;
            break;
            case "-":
                computation = prev - curr;
            break;
            case "x":
                computation = prev * curr;
            break;
            case "/":
                computation = prev / curr;
            break;
            default: ""
                return
        };

        this.currentOperand = computation;
        this.previousOperand = "";
        this.oper = undefined;
    }
    getDisplayUpdate(number){
        let input = number.toString();
        let intigerNumber = parseFloat(input.split(".")[0]);
        let decimalNumber = input.split(".")[1];
        let display;
        if(isNaN(intigerNumber)){
            display = "";
        }else{
            display = intigerNumber.toLocaleString("en", {maximumFractionDigits: 0});
        }
        if(decimalNumber != null){
            return`${display}.${decimalNumber}`
        }else{
            return display;
        }

    }
    updateDisplay(){
        this.currentDisplay.innerText = this.getDisplayUpdate(this.currentOperand);
        if(this.oper != null){
        this.previousDisplay.innerText = 
        `${this.getDisplayUpdate(this.previousOperand)} ${this.oper}`;
        }else{
            this.previousDisplay.innerText = ""
        }
    }
}

const numberButton = document.querySelectorAll(".number-btn");
const operationButton = document.querySelectorAll(".operation-btn");
const allClearButton = document.querySelector(".all-clear-btn");
const deleteButton = document.querySelector(".del-btn");
const currentDisplay = document.querySelector(".current-display");
const previousDisplay = document.querySelector(".previous-display");
const equalButton = document.querySelector(".equal-btn");


const cal = new Calculator(previousDisplay, currentDisplay);


// Adding Events To The Buttons


allClearButton.addEventListener("click", () => {
    cal.clear();
    cal.updateDisplay();
});
deleteButton.addEventListener("click", () => {
    cal.delete();
    cal.updateDisplay();
})
equalButton.addEventListener("click", () => {
    cal.compute();
    cal.equalButton();
    cal.updateDisplay();
})
numberButton.forEach(button => {
    button.addEventListener("click", ()=> {
        cal.appendNumber(button.innerText);
        cal.updateDisplay();
    })
});
operationButton.forEach(button => {
    button.addEventListener("click", ()=> {
        cal.operation(button.innerText);
        cal.updateDisplay();
    })
});