const elements = {
    sketchContainer: document.querySelector(".sketch__container"),
    colorPicker: document.querySelector(".sketch__color-picker"),
    checkboxBorder: document.querySelector(".sketch__checkbox"),
    inputCountSquare: document.querySelector(".sketch__range"),
    textCountSquare: document.querySelector(".sketch__range-text"),
    buttons: {
        color: document.querySelector("#color"),
        random: document.querySelector("#random"),
        eraser: document.querySelector("#eraser"),
        fill: document.querySelector("#fill"),
        clear: document.querySelector("#clear")
    }
};

let currentMode = "color";

const calcSizeSquare = count => elements.sketchContainer.clientWidth / count;

const createSketchSquare = (count, size, border) => {
    elements.sketchContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count * count; i++) {
        const square = document.createElement("div");
        square.className = "sketch__square";
        square.style.cssText = `width:${size}px;height:${size}px;background:#fff;${border ? 'outline:1px solid #000;outline-offset:-1px;' : ''}`;
        fragment.appendChild(square);
    }
    elements.sketchContainer.appendChild(fragment);
    return elements.sketchContainer.querySelectorAll(".sketch__square");
};

const colorFunctions = {
    color: square => square.style.background = elements.colorPicker.value,
    random: square => square.style.background = '#' + Math.floor(Math.random()*16777215).toString(16),
    eraser: square => square.style.background = "#ffffff"
};

const colorSketchSquare = squares => {
    squares.forEach(square => {
        square.addEventListener("mouseover", () => colorFunctions[currentMode](square));
    });
};

const updateButtonColor = (button, isActive) => {
    const colors = {
        color: elements.colorPicker.value,
        random: "linear-gradient(90deg, #52d6fc, #ff0fff)",
        eraser: "#ffffff"
    };
    button.style.background = isActive ? colors[button.id] || "#f0f6d5" : "#f0f6d5";
};

const setActiveButton = button => {
    Object.values(elements.buttons).forEach(btn => {
        btn.classList.toggle("active", btn === button);
        updateButtonColor(btn, btn === button);
    });
};

Object.entries(elements.buttons).forEach(([mode, button]) => {
    if (["color", "random", "eraser"].includes(mode)) {
        button.addEventListener("click", () => {
            currentMode = mode;
            setActiveButton(button);
        });
        ["mouseenter", "mouseleave"].forEach(event => {
            button.addEventListener(event, () => {
                if (!button.classList.contains("active")) {
                    updateButtonColor(button, event === "mouseenter");
                }
            });
        });
    }
});

elements.buttons.fill.addEventListener("click", () => {
    document.querySelectorAll(".sketch__square").forEach(colorFunctions.color);
});

elements.buttons.clear.addEventListener("click", () => {
    document.querySelectorAll(".sketch__square").forEach(colorFunctions.eraser);
});

["fill", "clear"].forEach(buttonId => {
    const button = elements.buttons[buttonId];
    ["mouseenter", "mouseleave"].forEach(event => {
        button.addEventListener(event, () => {
            button.style.background = event === "mouseenter" ? (buttonId === "fill" ? elements.colorPicker.value : "#ffffff") : "#f0f6d5";
        });
    });
});

elements.colorPicker.addEventListener("input", () => {
    if (elements.buttons.color.classList.contains("active")) {
        updateButtonColor(elements.buttons.color, true);
    }
});

const updateSketch = () => {
    const countSquare = elements.inputCountSquare.value;
    const border = elements.checkboxBorder.checked;
    elements.textCountSquare.textContent = `${countSquare}x${countSquare}`;
    const squares = createSketchSquare(countSquare, calcSizeSquare(countSquare), border);
    colorSketchSquare(squares);
    setActiveButton(elements.buttons[currentMode]);
};

const updateBorder = border => {
    document.querySelectorAll(".sketch__square").forEach(square => {
        square.style.outline = border ? "1px solid #000" : "none";
        square.style.outlineOffset = border ? "-1px" : "0";
    });
};

elements.inputCountSquare.addEventListener("input", updateSketch);
elements.checkboxBorder.addEventListener("click", () => updateBorder(elements.checkboxBorder.checked));

window.onload = updateSketch;