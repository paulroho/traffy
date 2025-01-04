'use client'

import Canvas, { Coordinates } from "@/components/Canvas";
import clock from "@/visualization/components/dev-tools/clock";
import debugInfo from "@/visualization/components/dev-tools/debugInfo";
import grid from "@/visualization/components/dev-tools/grid";
import someBackground from "@/visualization/components/dev-tools/someBackground";
import ledger from "@/visualization/components/dev-tools/ledger";
import { VehicleState } from "@/domain/Vehicle";
import { VehicleOptions } from "@/domain/Vehicle";
import { Vehicle } from "../../domain/Vehicle";

export default function Simulation() {
  const startTime = new Date();

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number, mousePosition: Coordinates) => {
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
    };
    const now = new Date();
    const duration = (now.getTime() - startTime.getTime()) / 1000;
    const velocity = 20;
    const carInitialState: VehicleState = {
      position: {
        x: duration * velocity,
        y: 500,
      },
      angle: Math.PI / 10,
      turnAngle: -Math.PI / 8,
    };
    const car = new Vehicle(carOptions, carInitialState);

    return [
      grid(gridOptions),
      car,
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
