import { Coordinates } from "@/components/Canvas";
import vehicle from "@/visualization/components/vehicle";
import { Renderable } from "@/visualization/Renderable";

export type VehicleOptions = {
  length: number;
  width: number;
  color: string;
};

export type VehicleState = {
  position: Coordinates;
  angle: number;
  turnAngle: number;
};

export class Vehicle implements Renderable {
  private options: VehicleOptions;
  private state: VehicleState;

  constructor(options: VehicleOptions, state: VehicleState) {
    this.options = options;
    this.state = state;
  }
  render(context: CanvasRenderingContext2D, frameCount: number, mousePosition: Coordinates): void {
    vehicle(this.options, this.state).render(context, frameCount, mousePosition);
  }
}
