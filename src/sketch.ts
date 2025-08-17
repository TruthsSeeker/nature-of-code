import p5 from "p5"
import type Mover from "./mover";
import Accelerator from "./accelerator";


export default (p: p5) => {
    let position: p5.Vector;
    let speed: p5.Vector;
    let movers: Mover[] = [];
    let xOffset = 0.001;

    Object.assign(p, {
        setup() {
            p.createCanvas(400, 400);
            position = p.createVector(100, 100)
            speed = p.createVector(10.5, 20.3)
    
            // for (var i = 0; i < 10; i++) {
            //   movers.push(new Mover())
            // }
    
            let accelerator = new Accelerator(p, p.createVector(0.0, 0.0), p.createVector(0, 0))
            movers.push(accelerator)
            let accelerator1 = new Accelerator(p, p.createVector(0.0, 0.0), p.createVector(0, 0))
            movers.push(accelerator1)

            movers.forEach(mover => {
                let helium = p.createVector(0, -0.05)
                mover.addForce('helium', helium)
    
            })
            
        },
        
        draw() {
            p.background(0);
            drawFPS();
            movers.forEach(mover => {
                
                if (p.mouseIsPressed) {
                    let wind = p.createVector(0.05, 0)
                    mover.applyForce(wind)
                }

                let randomWind = p.createVector(p.noise(xOffset * p.frameCount) * 0.5, 0)
                mover.applyForce(randomWind)
                
                mover.update()
            });
        }
        
    })

    function drawFPS() {
        p.push();
        p.fill(255);
        p.text(p.frameRate().toPrecision(3), 0, 10);
        p.pop;
    }
}