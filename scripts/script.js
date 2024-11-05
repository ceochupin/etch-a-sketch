const sketchContainer = document.querySelector(".sketch__container");

const sketchContainerSize = 196;
let countSquare = 24;

let squareSize = (sketchContainerSize / countSquare);

let allSketchSquare;

function createSketchSquare(countSquare, squareSize) {
    for (let i = 0; i < countSquare * countSquare; i++) {
        let square = document.createElement("div");
        square.className = "sketch__square";
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.style.outline = "1px solid #000";
        square.style.outlineOffset = "-1px";

        sketchContainer.appendChild(square);
    }

    allSketchSquare = sketchContainer.querySelectorAll(".sketch__square");
}

createSketchSquare(countSquare, squareSize);

function colorSquare(square) {
    square.style.backgroundColor = "green";
}

function colorSketchSquare () {
    if (allSketchSquare) {
        allSketchSquare.forEach(square => {
            square.addEventListener("mouseover", () => colorSquare(square));
        });
    }
}

colorSketchSquare();

