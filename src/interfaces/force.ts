import type p5 from "p5";
import type { Mover } from "./Mover";

export interface Force {
    calculateForce(mover: Mover, scalars?: Map<string, number>, vectors?: Map<string,p5.Vector>): p5.Vector
}