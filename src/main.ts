import p5 from "p5";
import sketch from "./sketch";

const root = document.getElementById("p5-root");
if (!root) {
    throw new Error("P5 root not found");
}

main(root);

function main(root: HTMLElement) {
    new p5(sketch, root)
}