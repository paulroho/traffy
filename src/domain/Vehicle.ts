import { add, mult, Position, rotate, subtract, Velocity2d } from "./basics";

export type VehicleOptions = {
  length: number;
  width: number;
  color: string;
};

export type VehicleState = {
  position: Position;
  velocity: Velocity2d;
  angle: number;
  turnAngle: number;
};

export class Vehicle {
  private _state: VehicleState;

  constructor(public readonly options: VehicleOptions, state: VehicleState) {
    this._state = state;
  };

  get state() { return this._state; }

  advance(duration: number) {
    const displacement = mult(this._state.velocity, duration);

    this._state = {
      ...this._state,
      position: add(this._state.position, displacement),
    };
  }

  rotateAround(center: Position, angle: number) {
    this._state.angle += angle;
    const inRotationCenter = subtract(this._state.position, center);
    const rotated = rotate(inRotationCenter, angle);
    const newPosition = add(rotated, center);

    this._state = {
      ...this._state,
      position: newPosition,
    };
  }
}
