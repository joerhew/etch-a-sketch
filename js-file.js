const DEFAULT_LENGTH = 10;
const DEFAULT_BRUSH_STRENGTH = 0.1;
const DEFAULT_MODE = 'Black & White';

let length = DEFAULT_LENGTH;
let brushStrength = DEFAULT_BRUSH_STRENGTH;
let mode = DEFAULT_MODE;

// Settings

const settings = document.querySelector('.settings');
const lengthValue = document.querySelector('#length-value');
const lengthSlider = document.querySelector('#length-slider');
const brushStrengthValue = document.querySelector('#brush-strength');
const brushStrengthSlider = document.querySelector('#brush-strength-slider');
const radioButtons = document.querySelectorAll('input[name="mode"]');
const modeValue = document.querySelector('#mode-value');
const sketchpad = document.querySelector('.sketchpad');
const resetButton = document.querySelector('.reset-button');

lengthSlider.addEventListener('change', () => {
    wipeSketchpad();
    lengthSlider.setAttribute('value',lengthSlider.value);
    length = lengthSlider.getAttribute('value');
    lengthValue.textContent = length;
    createSketchpad(length);
});

brushStrengthSlider.addEventListener('change', () => {
    brushStrengthSlider.setAttribute('value', brushStrengthSlider.value);
    brushStrength = parseFloat(brushStrengthSlider.getAttribute('value'));
    brushStrengthValue.textContent = brushStrength;
})

radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', () => {
        mode = radioButton.value;
        modeValue.textContent = mode;
    })
}) 

resetButton.addEventListener('click', () => {
    wipeSketchpad();
    createSketchpad(length);
})


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function createSketchpad(length) {
    sketchpad.style.gridTemplateColumns = `repeat(${length}, 1fr)`
    sketchpad.style.gridTemplateRows = `repeat(${length}, 1fr)`

    for (let i = 0; i < length * length; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.toggle('grid-element');
        sketchpad.appendChild(gridElement);  
        gridElement.addEventListener('mouseover', changeColour);
        gridElement.addEventListener('mousedown', changeColour);
        sketchpad.appendChild(gridElement);
    };
    
    lengthValue.textContent = length + " x " + length;

    const cls = document.querySelectorAll('.cell'); 

};

function changeColour(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (mode === 'Eraser') {
        e.target.style.backgroundColor = '';
    } else if (mode === 'Black & White' && e.target.style.backgroundColor === '') {
        e.target.style.backgroundColor = getBlackWhiteColor();
        e.target.style.opacity = (parseFloat(e.target.style.opacity) || 0) + brushStrength;
    } else if (mode === 'Pastel' && e.target.style.backgroundColor === '') {
        e.target.style.backgroundColor = getPastelColor();
        e.target.style.opacity = (parseFloat(e.target.style.opacity) || 0) + brushStrength;
    } else {
        e.target.style.opacity = (parseFloat(e.target.style.opacity) || 0) + brushStrength;
    }
    
}

function getPastelColor(){ 
    return "hsl(" + 360 * Math.random() + ',' +
               (25 + 70 * Math.random()) + '%,' + 
               (85 + 10 * Math.random()) + '%)'
  } 

function getBlackWhiteColor(){
    return "hsl(" + 0 + ',' +
                    0 + '%,' + 
                    100 * (Math.random()) + '%)'
  }

function wipeSketchpad() {
    sketchpad.innerHTML = '';
}

window.onload = () => {
    createSketchpad(length);
    brushStrengthValue.textContent = brushStrength;
    modeValue.textContent = mode;
    document.getElementById("black-white").checked = true;
}