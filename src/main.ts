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

const resetButton = document.getElementById('reset-button')
resetButton!.addEventListener('click', (e) => {
    p.setup()
})