export default interface UserInterface {
    paused: boolean
    pause(): void
    setDensity(value: number): void
    setGravity(value: number): void
    setFriction(value: number): void
}