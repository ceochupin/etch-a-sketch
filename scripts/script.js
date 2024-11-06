const sketchContainer = document.querySelector(".sketch__container");
const colorPicker = document.querySelector(".sketch__color-picker");
const inputCountSquare = document.querySelector(".sketch__range");
const textCountSquare = document.querySelector(".sketch__range-text");

const colorButton = document.querySelector("#color");
const randomButton = document.querySelector("#random");
const eraserButton = document.querySelector("#eraser");
const fillButton = document.querySelector("#fill");
const clearButton = document.querySelector("#clear");

let sketchContainerSize = sketchContainer.clientWidth;
let currentMode = "color";

function calcSizeSquare(countSquare) {
    return sketchContainerSize / countSquare;
}

function createSketchSquare(count, size) {
    sketchContainer.innerHTML = "";

    for (let i = 0; i < count * count; i++) {
        let square = document.createElement("div");
        square.className = "sketch__square";
        square.style.width = `${size}px`;
        square.style.height = `${size}px`;
        square.style.outline = "1px solid #000";
        square.style.outlineOffset = "-1px";

        sketchContainer.appendChild(square);
    }

    return sketchContainer.querySelectorAll(".sketch__square");
}

function getChangeColor(square) {
    let colorChange = colorPicker.value;
    square.style.background = colorChange;
}

function getRandomColor(square) {
    const letters = "0123456789ABCDEF";
    let colorRandom = "#";
    for (let i = 0; i < 6; i++) {
        colorRandom += letters[Math.floor(Math.random() * 16)];
    }
    square.style.background = colorRandom;
}

function getEraserColor(square) {
    square.style.background = "#ffffff";
}

function colorSketchSquare(squares) {
    squares.forEach(square => {
        square.addEventListener("mouseover", () => {
            switch(currentMode) {
                case "color":
                    getChangeColor(square);
                    break;
                case "random":
                    getRandomColor(square);
                    break;
                case "eraser":
                    getEraserColor(square);
                    break;
            }
        });
    });
}

function updateButtonColor(button, isActive) {
    let color;
    if (button === colorButton) {
        color = colorPicker.value;
    } else if (button === randomButton) {
        color = "linear-gradient(90deg, #52d6fc, #ff0fff)";
    } else if (button === eraserButton) {
        color = "#ffffff";
    }

    if (isActive) {
        button.style.background = color;
    } else {
        button.style.background = "#f0f6d5";
    }
}

function setActiveButton(button) {
    [colorButton, randomButton, eraserButton].forEach(btn => {
        btn.classList.remove("active");
        updateButtonColor(btn, false);
    });
    button.classList.add("active");
    updateButtonColor(button, true);
}

[colorButton, randomButton, eraserButton].forEach(button => {
    button.addEventListener("mouseenter", () => {
        if (!button.classList.contains("active")) {
            updateButtonColor(button, true);
        }
    });

    button.addEventListener("mouseleave", () => {
        if (!button.classList.contains("active")) {
            updateButtonColor(button, false);
        }
    });
});


colorButton.addEventListener("click", () => {
    currentMode = "color";
    setActiveButton(colorButton);
});

randomButton.addEventListener("click", () => {
    currentMode = "random";
    setActiveButton(randomButton);
});

eraserButton.addEventListener("click", () => {
    currentMode = "eraser";
    setActiveButton(eraserButton);
});

fillButton.addEventListener("click", () => {
    const squares = document.querySelectorAll(".sketch__square");
    squares.forEach(square => getChangeColor(square));
});

fillButton.addEventListener("mouseenter", () => {
    fillButton.style.background = colorPicker.value;
});

fillButton.addEventListener("mouseleave", () => {
    fillButton.style.background = "#f0f6d5";
});

clearButton.addEventListener("click", () => {
    const squares = document.querySelectorAll(".sketch__square");
    squares.forEach(square => getEraserColor(square));
});

clearButton.addEventListener("mouseenter", () => {
    clearButton.style.background = "#ffffff";
});

clearButton.addEventListener("mouseleave", () => {
    clearButton.style.background = "#f0f6d5";
});

colorPicker.addEventListener("input", () => {
    if (colorButton.classList.contains("active")) {
        updateButtonColor(colorButton, true);
    }
});

function updateSketch() {
    let countSquare = inputCountSquare.value;
    textCountSquare.textContent = `${countSquare}x${countSquare}`;
    const squares = createSketchSquare(countSquare, calcSizeSquare(countSquare));
    colorSketchSquare(squares);
    
    let activeButton;
    switch(currentMode) {
        case "color":
            activeButton = colorButton;
            break;
        case "random":
            activeButton = randomButton;
            break;
        case "eraser":
            activeButton = eraserButton;
            break;
        default:
            activeButton = colorButton;
    }
    
    setActiveButton(activeButton);
}

inputCountSquare.addEventListener("input", updateSketch);

window.onload = updateSketch;