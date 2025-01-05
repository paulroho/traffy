import { add, mult, Placement, Position, rotateAround, Velocity2d } from "./basics";

export type VehicleOptions = {
  length: number;
  width: number;
  color: string;
};

export type VehicleState = {
  placement: Placement;
  velocity: Velocity2d;
  turnAngle: number;
};

export class Vehicle {
  private _state: VehicleState;

  constructor(public readonly options: VehicleOptions, state: VehicleState) {
    this._state = state;
  };

  get state() { return this._state; }

  advance(duration: number) {
    const newPlacement = this.calculateNewPlacement(duration);

    this._state.placement = newPlacement;
  }

  private calculateNewPlacement(duration: number): Placement {
    const displacement = mult(this._state.velocity, duration);
    const newPosition = add(this._state.placement.position, displacement);

    return {
      ...this._state.placement,
      position: newPosition,
    };
  }

  rotateAround(center: Position, angle: number) {
    const oldPosition = this._state.placement.position;

    const newPosition = rotateAround(oldPosition, center, angle);

    this._state.placement.angle += angle;
    this._state.placement.position = newPosition;
  }
}
