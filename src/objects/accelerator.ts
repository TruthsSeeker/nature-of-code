import p5 from "p5"

export default class Accelerator extends Mover {
    acceleration: p5.Vector
    constructor(p: p5, acceleration: p5.Vector, speed?: p5.Vector, color?: p5.Color, size?: number) {
        super(p, color, size, speed)
        this.acceleration = acceleration
    }

    applyForces() {
        if (this.movementKeyIsPressed()) {
            this.applyForce(this.p.createVector(0.5, 0.5))
            this.setDirection()
        }
        super.applyForces()
    }

    setDirection() {
        let xDirection = 0
        let yDirection = 0

        if (this.p.keyIsDown(this.p.LEFT_ARROW) || this.p.keyIsDown(97)) { // a == 97
            xDirection = -1
        } else if (this.p.keyIsDown(this.p.RIGHT_ARROW) || this.p.keyIsDown(100)) { // d == 100
            xDirection = 1
        }

        if (this.p.keyIsDown(this.p.DOWN_ARROW) || this.p.keyIsDown(115)) { // s == 115
            yDirection = 1
        } else if (this.p.keyIsDown(this.p.UP_ARROW) || this.p.keyIsDown(119)) { // w == 119
            yDirection = -1
        }
        let heading = this.p.createVector(xDirection, yDirection).heading()

        this.acceleration.setHeading(heading)
    }

    movementKeyIsPressed() {
        return (
            this.p.keyIsDown(this.p.LEFT_ARROW) ||
            this.p.keyIsDown(this.p.RIGHT_ARROW) ||
            this.p.keyIsDown(this.p.UP_ARROW) ||
            this.p.keyIsDown(this.p.DOWN_ARROW) ||
            this.p.keyIsDown(97) || // a
            this.p.keyIsDown(100) || // d
            this.p.keyIsDown(115) || // s
            this.p.keyIsDown(119) // w
        )
    }
}
import Mover from "./mover"
