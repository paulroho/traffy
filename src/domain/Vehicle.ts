import { add, distance, getVector, mult, Placement, Position, rotateAround } from "./basics";

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
    return (this._state.turnAngle === 0)
      ? this.goStraightAhead(duration)
      : this.makeATurn(duration);
  }

  private goStraightAhead(duration: number) {
    const position = this._state.placement.position;
    const angle = this._state.placement.angle;

    const velocity2d = getVector(this._state.velocity, this._state.placement.angle)
    const displacement = mult(velocity2d, duration);

    const newPosition = add(position, displacement);

    return {
      position: newPosition,
      angle: angle,
    };
  }

  private makeATurn(duration: number) {
    const rotationCenter = { x: 250, y: 250 }; // TODO: Calculate from wheel distance and turnAngle

    const rearAxisCenter = this._state.placement.position;
    const radius = distance(rotationCenter, rearAxisCenter);
    const angularSpeed = this._state.velocity / radius;
    const angle = duration * angularSpeed;

    return this.goCircular(rotationCenter, angle);
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
