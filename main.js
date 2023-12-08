const numberButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operators");
const equalsButton = document.querySelector("#equals");
const deleteButton = document.querySelector("#delete");
const allClearButton = document.querySelector("#all-clear");
const outputText = document.querySelector(".output");

let currentInput = "";  // Track the current input
let totalResult = 0;    // Track the total result
let operation = null;    // Track the current operation
let equalsPressed = false;  // Flag to track if equals button has been pressed

numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (equalsPressed) {
      return;  // Ignore number input after pressing equals
    }
    
    if (button.textContent === "." && currentInput.includes(".")) {
      return;
    }
    
    if (button.textContent === "%") {
      currentInput *= 0.01;
    } else {
      currentInput += button.textContent;
    }
    
    outputText.textContent = currentInput;
  });
});

operationButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (equalsPressed) {
      equalsPressed = false;  // Reset the flag when a new operation is selected
    }

    if (currentInput !== "") {
      applyOperation();
      operation = button.textContent;
      currentInput = "";
      outputText.textContent = ""; // Clear the display when an operation is entered
    }
  });
});

equalsButton.addEventListener("click", function () {
  if (currentInput !== "") {
    applyOperation();
    operation = null;
    equalsPressed = true;  // Set the flag when equals is pressed
    currentInput = totalResult.toString(); // Set currentInput to the result
    outputText.textContent = currentInput;
  }
});

function applyOperation() {
  const inputValue = parseFloat(currentInput);
  if (!isNaN(inputValue)) {
    switch (operation) {
      case "+":
        totalResult += inputValue;
        break;
      case "-":
        totalResult -= inputValue;
        break;
      case "X":
        totalResult *= inputValue;
        break;
      case "/":
        totalResult /= inputValue;
        break;
      default:
        totalResult = inputValue;
    }
    outputText.textContent = totalResult;
  }
}

allClearButton.addEventListener("click", function () {
  equalsPressed = false;  // Reset the flag when AC is pressed
  currentInput = "";
  totalResult = 0;
  operation = null;
  outputText.textContent = "";
});


deleteButton.addEventListener("click", function () {
  if (equalsPressed) {
    equalsPressed = false;  // Reset the flag when delete is pressed
    currentInput = "";
  } else {
    currentInput = currentInput.slice(0, -1);
    outputText.textContent = currentInput;
  }
});

