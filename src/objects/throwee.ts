import p5 from "p5"
import Mover from "./mover";
import type IControllable from "../interfaces/controllable";

export default class Throwee extends Mover implements IControllable {
    propulsing: boolean = false

    calculatePropulsion(): p5.Vector {
        let direction = new p5.Vector(this.p.mouseX, this.p.mouseY).sub(this.position).mult(-1)
        return direction
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
}