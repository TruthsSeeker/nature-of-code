import p5 from "p5"
import { BasicMover } from "./BasicMover";
import type { Controllable } from "../interfaces/Controllable";

export class Throwee extends BasicMover implements Controllable {
    propulsing: boolean = false

    update(): void {
        if (this.propulsing) {
            this.p.push()
            this.p.stroke(255)
            this.p.line(this.position.x, this.position.y, this.p.mouseX, this.p.mouseY)
            this.p.pop()
        }
        super.update()
    }

    calculatePropulsion(): p5.Vector {
        let direction = new p5.Vector(this.p.mouseX, this.p.mouseY).sub(this.position).mult(-1)
        return direction.mult(10)
    }

    applyPropulsion() {
        this.applyForce(this.calculatePropulsion())
    }

    control(): void {
        this.propulsing = true
        this.velocity.mult(0)
    }

    release(): void {
        this.applyPropulsion()
        this.propulsing = false
    }

    applyForces(): void {
        if (!this.propulsing) {
            super.applyForces()
        }
    }
}