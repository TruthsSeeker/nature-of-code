import type { Vector } from "p5";
import type { Force } from "../interfaces/Force";
import type { Mover } from "../interfaces/Mover";
import { isMassive, type Massive } from "../interfaces/Massive";
import p5 from "p5";
import { ConstantForce } from "./ConstantForce";

const G = 9
export class Gravity implements Force {
    attractor: Mover & Massive

    constructor(attractor: Mover & Massive) {
        this.attractor = attractor
    }

    calculateForce(mover: Mover, scalars?: Map<string, number>, vectors?: Map<string, Vector>): Vector {
        if (!isMassive(mover))
        {
            return new p5.Vector(0)
        }

        let r = p5.Vector.sub(this.attractor.position, mover.position)
        let distSq = r.magSq() // saves a sqrt
        let dir = r.copy().normalize()

        let f = (G * this.attractor.mass * mover.mass ) / distSq

        return dir.mult(f)
    }

}

export class UniformGravity extends ConstantForce {
    G: number 

    constructor(f: p5.Vector, g?: number) {
        super(f)
        this.G = g ?? G
    }

    static downward(g?: number): UniformGravity {
        let down = new p5.Vector(0, 1)
        return new UniformGravity(down, g)
    }
    
    calculateForce(mover: Mover, scalars?: Map<string, number>, vectors?: Map<string, p5.Vector>): p5.Vector {
        if (!isMassive(mover)) {
            return new p5.Vector(0)
        }

        let f =  this.force.copy().mult(mover.mass * this.G)
        return f
    }
}