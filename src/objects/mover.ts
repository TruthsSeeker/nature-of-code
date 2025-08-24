import p5 from "p5"
import type IMover from "../interfaces/mover"
import type Force from "../interfaces/force"

export default class Mover implements IMover {
    position: p5.Vector
    velocity: p5.Vector
    size: number
    color: p5.Color
    p: p5
    forces: Map<string,Force>
    acceleration: p5.Vector

    constructor(p: p5, color?: p5.Color, size?: number, speed?: p5.Vector, position?: p5.Vector) {
        this.p = p 
        this.position = position ?? p.createVector(p.width/2, p.height/2)
        this.velocity = speed ?? p.createVector()
        this.size = size ?? p.random(5, 100)
        this.color = color ?? p.color([p.random(255), p.random(255), p.random(255)])
        this.forces = new Map()
        this.acceleration = p.createVector()
    }

    update() {
        this.applyForces()
        this.checkWalls()
        this.draw()
        this.acceleration.mult(0)
    }

    checkWalls() {
        if (this.position.x >= this.p.width - this.size / 2 ) {
            this.position.x = this.p.width - this.size/2
            this.velocity.x *= -1
        } else if (this.position.x < this.size/2) {
            this.position.x = this.size/2
            this.velocity.x *= -1
        }

        if (this.position.y >= this.p.height - this.size/2) {
            this.position.y = this.p.height - this.size/2
            this.velocity.y *= -1
        } else if (this.position.y < this.size/2) {
            this.position.y = this.size/2
            this.velocity.y *= -1
        }

        // Forcefield mode

        // let xComponent = 0
        // if (this.position.x > this.p.width/2) {
        //     xComponent = 10000 / - Math.pow(this.p.width - this.position.x, 2)
        // } else {
        //     xComponent = 10000 / Math.pow(this.position.x, 2)
        // }

        // let yComponent = 0
        // if (this.position.y > this.p.width/2 ) {
        //     yComponent = 10000 / -Math.pow(this.p.height - this.position.y, 2)
        // } else {
        //     yComponent = 10000 / Math.pow(this.position.y, 2)
        // }

        // this.applyForce(this.p.createVector(xComponent, yComponent))
    }

    draw() {
        this.p.fill(this.color)
        this.p.circle(this.position.x, this.position.y, this.size)
    }

    applyForces() {
        this.forces.forEach((force, name) => {
            this.applyForce(force.calculateForce(this))
        });
        this.velocity.add(this.acceleration)
        this.velocity.limit(10)
        this.position.add(this.velocity)
    }

    applyForce(force: p5.Vector) {
        let f = this.p.createVector()
        p5.Vector.div(force, this.size, f)
        this.acceleration.add(f)
    }

    addForce(name: string, force: Force) {
        this.forces.set(name, force)
    }

    removeForce(name: string) {
        this.forces.delete(name)
    }

    contactEdge(): boolean {
        if ((this.position.x >= this.p.width - this.size / 2 ) 
        || (this.position.y >= this.p.height - this.size/2) 
        || (this.position.x <= this.size/2) 
        || (this.position.y <= this.size/2)) {
            return true
        }

        return false 
    }

    pointIsInside(point: p5.Vector): boolean {

        return point.dist(this.position) <= this.size/2
    }
}
