import p5 from "p5";
import sketch from "./sketch";
import type UserInterface from "./interfaces/UserInterface";

const root = document.getElementById("p5-root");
if (!root) {
    throw new Error("P5 root not found");
}

let p = init(root);
function init(root: HTMLElement) {
    return new p5(sketch, root) as p5 & UserInterface
}

const pauseButton = document.getElementById("pause-button")
pauseButton!.addEventListener('click', (e) => {
    p.pause()
    if (p.paused) {
        pauseButton!.innerText = "Play"
    } else {
        pauseButton!.innerText = "Pause"
    }
})


function getInput(id: string): HTMLInputElement {
    let el = document.getElementById(id)
    if (!(el instanceof HTMLInputElement)) {
        throw new Error(`Expected an input element for id: ${id}` );
    }
    
    return el
}

const densitySlider = getInput('density-slider')
densitySlider.addEventListener('input', (e) => {
    p.setDensity(parseFloat(densitySlider.value))
})
const gravitySlider = getInput('gravity-slider')
gravitySlider.addEventListener('input', (e) => {
    p.setGravity(parseFloat(gravitySlider.value))
})
const dragSlider = getInput('friction-slider')
dragSlider.addEventListener('input', (e) => {
    p.setFriction(parseFloat(dragSlider.value))
})

const resetButton = document.getElementById('reset-button')
resetButton!.addEventListener('click', (e) => {
    p.setup()
    p.setDensity(parseFloat(densitySlider.value))
    p.setGravity(parseFloat(gravitySlider.value))
    p.setFriction(parseFloat(dragSlider.value))
})
