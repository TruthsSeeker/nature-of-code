import type p5 from "p5";

export default interface IMover {
    position: p5.Vector
    size: number
    velocity: p5.Vector
    color: p5.Color

    contactEdge(): boolean
    pointIsInside(point: p5.Vector): boolean
}