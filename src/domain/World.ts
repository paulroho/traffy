import { Vehicle, VehicleOptions, VehicleState } from "./Vehicle";

export class World {
  private startedAt: Date;
  private now: Date;
  private vehicles: Vehicle[] = [];

  constructor(now: Date) {
    this.startedAt = now;
    this.now = now;
  }

  setup() {
    const carOptions: VehicleOptions = {
      length: 12,
      width: 5,
      color: "rgba(0, 127, 255, 0.75)",
      overhangRelative: {
        rear: 0.2,
        front: 0.2,
      }
    };
    const carInitialState: VehicleState = {
      placement: {
        x: 2500,
        y: 4000,
        angle: -Math.PI / 2
      },
      speed: 10,
      turnAngle: 0.4,
    };
    const car = new Vehicle(carOptions, carInitialState);

    this.addVehicle(car);
  }

  get millisecondsSinceStarted(): number {
    return this.now.getTime() - this.startedAt.getTime();
  }

  addVehicle(vehicle: Vehicle) {
    this.vehicles.push(vehicle);
  }

  advanceTo(newNow: Date) {
    const duration = (newNow.getTime() - this.now.getTime()) / 1000;
    this.now = newNow;

    this.vehicles.forEach(
      v => v.advance(duration)
    );
  }

  get aVehicle(): Vehicle {
    return this.vehicles[0];
  }
}
