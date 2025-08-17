import type p5 from "p5";
import type IMover from "./mover";

export default interface IReactor extends IMover {
    reactMove(change: p5.Vector): void
}