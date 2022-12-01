import * as ts from "../settings/tmplt_settings.js";
import * as s from "../settings/settings.js";
import * as vects from "../vectors.js";

type onInputFunc = (value: number, max?: number)=>void;

let index = 0
const createSlider = (
    min: number, max: number, 
    scale: number, text: string,
    preSetValue: number = 0,
    color: string = ts.sliderColor,
    func: onInputFunc = (value: number)=>{},
    ) => {
    
    let idx = index;
    index++;

    var slideContainer = document.createElement('div')
    document.body.appendChild(slideContainer)
    slideContainer.setAttribute('class', 'slidecontainer')
    slideContainer.style.top = ts.sliderHeight(idx)
    var input = document.createElement('input')
    input.setAttribute('class', 'slider')
    input.setAttribute('type','range')
    input.setAttribute('min', min as unknown as string)
    input.setAttribute('max', max as unknown as string)
    input.setAttribute('value', preSetValue as unknown as string)
    slideContainer.appendChild(input)
    var outputSpan = document.createElement('span')
    outputSpan.setAttribute('class', 'text')
    outputSpan.style.color = color
    slideContainer.appendChild(outputSpan)

    let value: number;
    const updateOutput = () => {
        outputSpan.innerHTML = text + ": " + input.value
        value = input.value as unknown as number * scale
        func(value, max)
    }
    updateOutput()
    input.oninput = updateOutput
    
    return {
        get value(){return value},
    }
}


let vectNum = createSlider(2, 10, 1,  "Anzahl der komplexen Zahlen", s.VECT_NUM, 
    ts.sliderColor,
    (value)=>{
        try {
            while (value < vects.vectors.length) vects.removeVect()
            while (value > vects.vectors.length) vects.addVect(); 
        }
        catch (error) {
            console.log(error)
        }
    },
)

export {
    vectNum,
}

