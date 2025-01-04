import { Position, Velocity2d } from "./basics";

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
    this._state = {
      ...this._state,
      position: {
        x: this._state.position.x + duration * this._state.velocity.x,
        y: this._state.position.y + duration * this._state.velocity.y,
      },
    };
  }
}
