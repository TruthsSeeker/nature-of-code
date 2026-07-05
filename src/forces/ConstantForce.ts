import type p5 from "p5";
import type { Force } from "../interfaces/Force";
import type { Mover } from "../interfaces/Mover";

export class ConstantForce implements Force {
    force: p5.Vector

    constructor(force: p5.Vector) {
        this.force = force.copy()
    }

    calculateForce(mover: Mover, scalars?: Map<string, number>, vectors?: Map<string, p5.Vector>): p5.Vector {
        return this.force.copy()
    }
}