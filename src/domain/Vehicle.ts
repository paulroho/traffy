import { Position } from "./basics";

export type VehicleOptions = {
  length: number;
  width: number;
  color: string;
};

export type VehicleState = {
  position: Position;
  angle: number;
  turnAngle: number;
};

export class Vehicle {
  constructor(
    public readonly options: VehicleOptions,
    public readonly state: VehicleState) { };
}
