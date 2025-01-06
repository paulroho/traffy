import { add, distance, getOrthogonalVector, getVector, invert, matrixMult, MetaStateItem, mult, Placement, Position, rotateAround, subtract, Vector2d, vectorWithLength } from "./basics";

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
  private _metaState: MetaStateItem[] = [];

  constructor(public readonly options: VehicleOptions, state: VehicleState) {
    this._state = state;
  };

  get state() { return this._state; }
  get metaState() { return this._metaState; }

  advance(duration: number) {
    this._metaState = [];
    const newPlacement = this.calculateNewPlacement(duration);

    this._state.placement = newPlacement;
  }

  private addMetaPoint(info: string, position: Position) {
    this._metaState.push({...position, info});
  }

  private addMetaVector(info: string, vector: Vector2d, from: Position) {
    this._metaState.push({from, vector, length: 100, info});
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
    const a = getVector(1, this._state.placement.angle + this._state.turnAngle + Math.PI / 2);
    const A = this.getFrontAxisCenter();
    this.addMetaPoint("A", A);
    this.addMetaVector("a", a, A)
    const D = subtract(A, this._state.placement);
    const b = getOrthogonalVector(D);
    this.addMetaVector("b", b, this._state.placement);

    const R = {
      e11: a.x, e12: -b.x,
      e21: a.y, e22: -b.y,
    };
    const Rinv = invert(R);

    const factors = matrixMult(Rinv, D);
    const factorForA = -factors.x;

    const vectorFromA = mult(a, factorForA);
    const center = add(A, vectorFromA);
    this.addMetaPoint("C", center);

    return center;
  }

  private getFrontAxisCenter(): Position {
    const wheelbaseRelative = 1 - (this.options.overhangRelative.rear + this.options.overhangRelative.front);
    const wheelbase = wheelbaseRelative * this.options.length;
    const direction = getVector(1, this._state.placement.angle);
    const fromRearToFrontAxis = vectorWithLength(direction, wheelbase);
    
    return add(this._state.placement, fromRearToFrontAxis);
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
