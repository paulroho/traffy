import { add, magnitudeInDirection, mult, Placement, Position, rotateAround } from "./basics";

export type VehicleOptions = {
  length: number;
  width: number;
  color: string;
};

export type VehicleState = {
  placement: Placement;
  velocity: number;
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

  rotateAround(center: Position, angle: number) {
    this._state.placement = this.goCircular(center, angle);
  }

  private calculateNewPlacement(duration: number): Placement {
    return this.goStraightAhead(duration);
  }

  private goStraightAhead(duration: number) {
    const position = this._state.placement.position;
    const angle = this._state.placement.angle;

    const velocity2d = magnitudeInDirection(this._state.velocity, this._state.placement.angle)
    const displacement = mult(velocity2d, duration);

    const newPosition = add(position, displacement);

    return {
      position: newPosition,
      angle: angle,
    };
  }

  private goCircular(center: Position, rotateBy: number) {
    const position = this._state.placement.position;
    const angle = this._state.placement.angle;

    const newPosition = rotateAround(position, center, rotateBy);
    const newAngle = angle + rotateBy;

    return {
      position: newPosition,
      angle: newAngle
    };
  }
}
