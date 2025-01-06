'use client'

import Canvas from "@/components/Canvas";
import { Position } from "@/domain/basics";
import clock from "@/visualization/components/dev-tools/clock";
import debugInfo from "@/visualization/components/dev-tools/debugInfo";
import grid from "@/visualization/components/dev-tools/grid";
import someBackground from "@/visualization/components/dev-tools/someBackground";
import ledger from "@/visualization/components/dev-tools/ledger";
import { VehicleState } from "@/domain/Vehicle";
import { VehicleOptions } from "@/domain/Vehicle";
import { Vehicle } from "../../domain/Vehicle";
import renderableVehicle from "@/visualization/components/vehicle";

export default function Simulation() {
  const startTime = new Date();
  let previousTime = startTime;

  const gridOptions = {
    x: {
      start: -250,
      end: 10000,
      interval: 500,
    },
    y: {
      start: -1000,
      end: +1000,
      interval: 100,
    }
  };

  const carOptions: VehicleOptions = {
    length: 120,
    width: 50,
    color: "rgba(0, 127, 255, 0.75)",
    overhangRelative: {
      rear: 0.2,
      front: 0.2,
    }
  };
  const carInitialState: VehicleState = {
    placement: {
      x: 100,
      y: 250,
      angle: -Math.PI / 2
    },
    speed: 100,
    turnAngle: Math.PI / 6,
  };
  const car = new Vehicle(carOptions, carInitialState);

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number, mousePosition: Position) => {
    const layers = [
      getBackgroundLayer(),
      getGraphicLayer(),
      getOverlayLayer(),
    ];

    layers.forEach(
      layer => layer.forEach(
        r => r.render(ctx, frameCount, mousePosition)
      )
    );
  }

  return (
    <div className="h-lvh p-4">
      <main className="flex flex-col items-center h-full">
        <Canvas draw={draw} />
      </main>
    </div>
  );

  function getBackgroundLayer() {
    return [
      someBackground(),
    ];
  }

  function getGraphicLayer() {
    const now = new Date();
    const duration = (now.getTime() - previousTime.getTime()) / 1000;
    previousTime = now;

    car.advance(duration);

    return [
      grid(gridOptions),
      renderableVehicle(car),
    ];
  }

  function getOverlayLayer() {
    return [
      clock(),
      ledger(),
      debugInfo(),
    ];
  }
}
