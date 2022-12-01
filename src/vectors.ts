
import * as s from "./settings/settings.js";
import * as sliders from "./user_input/sliders.js";

type vector = [
    number,
    number,
]

let vects: vector[] = [];

function pixToCoord(v: vector): vector{
    return [
        (v[0] - window.innerWidth / 2) / s.SCALE,
        (v[1] - window.innerHeight / 2) / s.SCALE,
    ]
}
function coordToPix(v: vector): vector{
    return [
        v[0] * s.SCALE + window.innerWidth / 2,
        v[1] * s.SCALE + window.innerHeight / 2,
    ]
}
function addVect(){
    vects.push([Math.random()*1.5 -1, Math.random()*1.5 -1])
}
function removeVect(){
    vects.pop()
}
function fillVects(){
    for (let i = 0; i < sliders.vectNum.value; i++) {
        addVect()
    }
}
function addListeners(){
    let selected = 0;
    window.addEventListener("mousemove", (e) => {
        vects[selected] = pixToCoord([e.clientX, e.clientY])
    })
    window.addEventListener("click", (e) => {
        selected = (selected + 1) % sliders.vectNum.value
    })
}
function product(): vector {
    let prod: vector = [vects[0][0], vects[0][1]];
    for (let i = 1; i < sliders.vectNum.value; i++) {
        let a = prod[0] * vects[i][0] - prod[1] * vects[i][1]
        let b= prod[0] * vects[i][1] + prod[1] * vects[i][0]
        prod[0] = a
        prod[1] = b
    }
    
    return prod
}   
function sum(): vector {
    let sum: vector = [0, 0]
    for (let i = 0; i < sliders.vectNum.value; i++) {
        sum[0] += vects[i][0]
        sum[1] += vects[i][1]
    }
    return sum
}

fillVects()
addListeners()

export {
    vector,
    product,
    sum,
    coordToPix,
    addVect,
    removeVect,
    vects as vectors,
}