import p5 from "p5"
import type { BasicMover } from "./objects/BasicMover";
import { Accelerator } from "./objects/Accelerator";
import { ConstantForce } from "./forces/ConstantForce";
import { Friction } from "./forces/Friction";
import { Throwee } from "./objects/Throwee";


export default (p: p5) => {
    let position: p5.Vector;
    let speed: p5.Vector;
    let movers: BasicMover[];
    let paused = false;
    let controlledObject: Throwee | null | undefined;

    p.setup = () => {
        movers = [];
        p.createCanvas(400, 400);
        position = p.createVector(100, 100)
        speed = p.createVector(10.5, 20.3)

        // for (var i = 0; i < 10; i++) {
        //   movers.push(new Mover())
        // }

        // let accelerator = new Accelerator(p, p.createVector(0.0, 0.0), p.createVector(0, 0))
        // movers.push(accelerator)
        // let accelerator1 = new Accelerator(p, p.createVector(0.0, 0.0), p.createVector(0, 0))
        // movers.push(accelerator1)

        let propulsed = new Throwee(p)
        movers.push(propulsed)

        movers.forEach(mover => {
            // let helium = p.createVector(0, -0.05)
            // mover.addForce('helium', new ConstantForce(helium))

            let gravity = p.createVector(0, 1)
            mover.addForce('gravity', new ConstantForce(gravity))
        })
    }
        
    p.draw = () => {
        p.background(0);

        if (paused) {
            return;
        }
        drawFPS();

        p.rect(p.mouseX - 5, p.mouseY - 5, 10, 10)
        let friction = new Friction(15)
        movers.forEach(mover => {
            
            if (p.mouseIsPressed) {
                // let wind = p.createVector(0.05, 0)
                // mover.applyForce(wind)
            }

            // let randomWind = p.createVector(p.noise(xOffset * p.frameCount) * 0.5, 0)
            // mover.applyForce(randomWind)
            
            mover.addForce('friction', friction)
            
            // let fanWind = p.createVector(p.mouseX, p.mouseY).sub(mover.position)
            // fanWind.setMag(1000 / -fanWind.magSq())
            // mover.applyForce(fanWind)



            mover.update()
        });
    }

    
    Object.assign(p, {
        pause() {
            paused = !paused
        }
    })

    p.mousePressed = (e) => {
        console.log('mousePressed')
        movers.forEach(mover => {
            if (mover instanceof Throwee && !mover.propulsing && !controlledObject) {
                console.log('propulsor')
                if (mover.pointIsInside(new p5.Vector(p.mouseX, p.mouseY))) {
                    console.log('assuming direct control')
                    mover.control()
                    controlledObject = mover
                }
            }
        });
    }

    p.mouseReleased = (e) => {
        controlledObject?.release()
        controlledObject = null;
    }

    function drawFPS() {
        p.push();
        p.fill(255);
        p.text(p.frameRate().toPrecision(3), 0, 10);
        p.pop;
    }
}