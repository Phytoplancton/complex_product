import * as ts from "../settings/tmplt_settings.js";
import * as s from "../settings/settings.js";
import * as vects from "../vectors.js";
let index = 0;
const createSlider = (min, max, scale, text, preSetValue = 0, color = ts.sliderColor, func = (value) => { }) => {
    let idx = index;
    index++;
    var slideContainer = document.createElement('div');
    document.body.appendChild(slideContainer);
    slideContainer.setAttribute('class', 'slidecontainer');
    slideContainer.style.top = ts.sliderHeight(idx);
    var input = document.createElement('input');
    input.setAttribute('class', 'slider');
    input.setAttribute('type', 'range');
    input.setAttribute('min', min);
    input.setAttribute('max', max);
    input.setAttribute('value', preSetValue);
    slideContainer.appendChild(input);
    var outputSpan = document.createElement('span');
    outputSpan.setAttribute('class', 'text');
    outputSpan.style.color = color;
    slideContainer.appendChild(outputSpan);
    let value;
    const updateOutput = () => {
        outputSpan.innerHTML = text + ": " + input.value;
        value = input.value * scale;
        func(value, max);
    };
    updateOutput();
    input.oninput = updateOutput;
    return {
        get value() { return value; },
    };
};
let vectNum = createSlider(2, 10, 1, "Anzahl der komplexen Zahlen", s.VECT_NUM, ts.sliderColor, (value) => {
    try {
        while (value < vects.vectors.length)
            vects.removeVect();
        while (value > vects.vectors.length)
            vects.addVect();
    }
    catch (error) {
        console.log(error);
    }
});
export { vectNum, };
