import type p5 from "p5";
import type Force from "../interfaces/force";
import type IMover from "../interfaces/mover";

export default class ConstantForce implements Force {
    force: p5.Vector

    constructor(force: p5.Vector) {
        this.force = force.copy()
    }

    calculateForce(mover: IMover, scalars?: Map<string, number>, vectors?: Map<string, p5.Vector>): p5.Vector {
        return this.force.copy()
    }
}