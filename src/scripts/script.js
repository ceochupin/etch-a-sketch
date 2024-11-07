// Получение элементов DOM
const sketchContainer = document.querySelector('.sketch__container');
const colorPicker = document.querySelector('.sketch__color-picker');
const checkboxBorder = document.querySelector('.sketch__checkbox');
const inputCountSquare = document.querySelector('.sketch__range');
const textCountSquare = document.querySelector('.sketch__range-text');
const buttonColor = document.querySelector('#color');
const buttonRandom = document.querySelector('#random');
const buttonEraser = document.querySelector('#eraser');
const buttonFill = document.querySelector('#fill');
const buttonClear = document.querySelector('#clear');

let currentMode = 'color';

// Функция для расчета размера квадрата
function calcSizeSquare(count) {
  return sketchContainer.clientWidth / count;
}

// Функция для создания сетки квадратов
function createSketchSquare(count, size, border) {
  sketchContainer.innerHTML = '';
  for (let i = 0; i < count * count; i++) {
    const square = document.createElement('div');
    square.className = 'sketch__square';
    square.style.cssText = `width:${size}px; height:${size}px; background:#fff; ${border ? 'outline:1px solid #000; outline-offset:-1px;' : ''}`;
    sketchContainer.appendChild(square);
  }
  return sketchContainer.querySelectorAll('.sketch__square');
}

// Функции для окрашивания квадратов
function colorSquare(square) {
  square.style.background = colorPicker.value;
}

function randomColorSquare(square) {
  square.style.background = '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function eraseSquare(square) {
  square.style.background = '#ffffff';
}

// Функция для установки обработчиков событий на квадраты
function colorSketchSquare(squares) {
  squares.forEach(square => {
    square.addEventListener('mouseover', () => {
      if (currentMode === 'color') colorSquare(square);
      else if (currentMode === 'random') randomColorSquare(square);
      else if (currentMode === 'eraser') eraseSquare(square);
    });
  });
}

// Функция для обновления цвета кнопки
function updateButtonColor(button, isActive) {
  if (button.id === 'color' || button.id === 'fill') {
    button.style.background = isActive ? colorPicker.value : '#f0f6d5';
  } else if (button.id === 'random') {
    button.style.background = isActive ? 'linear-gradient(90deg, #52d6fc, #ff0fff)' : '#f0f6d5';
  } else {
    button.style.background = isActive ? '#ffffff' : '#f0f6d5';
  }
}

// Функция для установки активной кнопки
function setActiveButton(button) {
  [buttonColor, buttonRandom, buttonEraser, buttonFill, buttonClear].forEach(btn => {
    btn.classList.toggle('active', btn === button);
    updateButtonColor(btn, btn === button);
  });
}

// Установка обработчиков событий на кнопки
[buttonColor, buttonRandom, buttonEraser, buttonFill, buttonClear].forEach(button => {
  if (button === buttonColor || button === buttonRandom || button === buttonEraser) {
    button.addEventListener('click', () => {
      currentMode = button.id;
      setActiveButton(button);
    });
  } else {
    button.addEventListener('click', () => {
      document
        .querySelectorAll('.sketch__square')
        .forEach(button === buttonFill ? colorSquare : eraseSquare);
    });
  }

  // Ховер для кнопок
  ['mouseenter', 'mouseleave'].forEach(mouse => {
    button.addEventListener(mouse, () => {
      if (!button.classList.contains('active')) {
        updateButtonColor(button, mouse === 'mouseenter');
      }
    });
  });
});

// Обработчик изменения цвета
colorPicker.addEventListener('input', () => {
  if (buttonColor.classList.contains('active')) {
    updateButtonColor(buttonColor, true);
  }
});

// Функция обновления сетки
function updateSketch() {
  const countSquare = inputCountSquare.value;
  const border = checkboxBorder.checked;
  textCountSquare.textContent = `${countSquare}x${countSquare}`;
  const squares = createSketchSquare(countSquare, calcSizeSquare(countSquare), border);
  colorSketchSquare(squares);
  setActiveButton(document.querySelector(`#${currentMode}`));
}

// Функция обновления границ квадратов
function updateBorder(border) {
  document.querySelectorAll('.sketch__square').forEach(square => {
    square.style.outline = border ? '1px solid #000' : 'none';
    square.style.outlineOffset = border ? '-1px' : '0';
  });
}

// Установка обработчиков событий
inputCountSquare.addEventListener('input', updateSketch);
checkboxBorder.addEventListener('click', () => updateBorder(checkboxBorder.checked));

// Инициализация при загрузке страницы
window.onload = updateSketch;
