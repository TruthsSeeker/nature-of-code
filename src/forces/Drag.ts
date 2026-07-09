import type { Vector } from "p5";
import type { Force } from "../interfaces/Force";
import type { Mover } from "../interfaces/Mover";

const DEFAULT_DENSITY = 0.1

export class Drag implements Force {
    density: number
    coefficient: number

    constructor(density: number, coefficient: number) {
        this.density = density
        this.coefficient = coefficient
    }

    static defaultFluid(coeff:number): Drag {
        return new Drag(DEFAULT_DENSITY, coeff)
    }

    calculateForce(mover: Mover, scalars?: Map<string, number>, vectors?: Map<string, Vector>): Vector {
        let v = mover.velocity.copy().normalize().mult(-1)

        let magSq = mover.velocity.magSq()

        v = v.mult(magSq * this.density * this.coefficient * mover.size)
        return v
    }

}