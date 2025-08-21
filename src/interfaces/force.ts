import type p5 from "p5";
import type IMover from "./mover";

export default interface Force {
    calculateForce(mover: IMover, scalars?: Map<string, number>, vectors?: Map<string,p5.Vector>): p5.Vector
}