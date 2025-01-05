import { add, distance, getVector, mult, Placement, Position, rotateAround } from "./basics";

export type VehicleOptions = {
  length: number;
  width: number;
  color: string;
  overhangRelative: {
    rear: number,
    front: number,
  }
};

export type VehicleState = {
  placement: Placement;
  speed: number;
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
    return (this._state.turnAngle === 0)
      ? this.goStraightAhead(duration)
      : this.makeATurn(duration);
  }

  private goStraightAhead(duration: number): Placement {
    const position = this._state.placement;
    const angle = this._state.placement.angle;

    const velocity = getVector(this._state.speed, this._state.placement.angle)
    const displacement = mult(velocity, duration);

    const newPosition = add(position, displacement);

    return {
      ...newPosition,
      angle: angle,
    };
  }

  private makeATurn(duration: number): Placement {
    const rotationCenter = this.calculateRotationCenter();
    const angle = this.calculateAngle(rotationCenter, duration);

    return this.goCircular(rotationCenter, angle);
  }

  private calculateRotationCenter() {
    // TODO: Calculate from wheel base and turnAngle
    return { x: 250, y: 250 };
  }

  private calculateAngle(rotationCenter: Position, duration: number) {
    const rearAxisCenter = this._state.placement;
    const radius = distance(rotationCenter, rearAxisCenter);
    const angularSpeed = this._state.speed / radius;

    return duration * angularSpeed;
  }

  private goCircular(center: Position, rotateBy: number): Placement {
    const position = this._state.placement;
    const angle = this._state.placement.angle;

    const newPosition = rotateAround(position, center, rotateBy);
    const newAngle = angle + rotateBy;

    return {
      ...newPosition,
      angle: newAngle
    };
  }
}
