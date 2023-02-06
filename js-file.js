var rows = [];
var cells = [];
var height = 16;
var width = 16;

let sketchpad = document.querySelector('.sketchpad');

for (var i = 1; i <= height; i++) {
    rows[i] = document.createElement('div');
    rows[i].classList.toggle('row');
    rows[i].setAttribute('id','r'+i);
    sketchpad.appendChild(rows[i]);  

    for (var j = 1; j <= width; j++) {
        cells[j] = document.createElement('div');
        cells[j].classList.toggle('cell');
        cells[j].setAttribute('id','r'+i+'c'+j);
        rows[i].appendChild(cells[j]);
    };
};

const cls = document.querySelectorAll('.cell'); 

cls.forEach((cl) => {
    cl.addEventListener('mouseover', () => { //change to mouseover
        cl.style.backgroundColor = '#000000';
        cl.style.opacity = (parseFloat(cl.style.opacity) || 0) + 0.05;
    });
});