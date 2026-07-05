import type { Vector } from "p5";
import type { Force } from "../interfaces/Force";
import type { Mover } from "../interfaces/Mover";
import type { Massive } from "../interfaces/massive";

export default class Gravity implements Force {
    calculateForce(mover: Mover, scalars?: Map<string, number>, vectors?: Map<string, Vector>): Vector {

        throw new Error("Method not implemented.");
    }

}