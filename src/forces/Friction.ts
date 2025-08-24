import p5 from "p5";
import type Force from "../interfaces/force";
import type IMover from "../interfaces/mover";

export default class Friction implements Force {
    coefficient: number

    constructor(coef: number) {
        this.coefficient = coef
    }

    calculateForce(mover: IMover, scalars?: Map<string, number>, vectors?: Map<string, p5.Vector>): p5.Vector {
        if (!mover.contactEdge()) {
            return new p5.Vector(0)
        }

        console.log('friction')

        let direction = mover.velocity.copy().normalize().mult(-1)
        let normal = scalars?.get('normal') ?? 1

        let frictionMag = this.coefficient * normal

        return direction.mult(frictionMag)
    }
}