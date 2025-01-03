'use client'

import Canvas, { Coordinates } from "@/components/Canvas";
import clock from "@/visualization/components/dev-tools/clock";
import debugInfo from "@/visualization/components/dev-tools/debugInfo";
import grid from "@/visualization/components/dev-tools/grid";
import someBackground from "@/visualization/components/dev-tools/someBackground";
import ledger from "@/visualization/components/dev-tools/ledger";
import vehicle, { VehicleOptions, VehicleState } from "@/visualization/components/vehicle";

export default function Simulation() {
  const startTime = new Date();

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number, mousePosition: Coordinates) => {
    const aGrid = grid({
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
    });

    const carOptions: VehicleOptions = {
      length: 150,
      width: 50,
    };
    const now = new Date();
    const duration = (now.getTime() - startTime.getTime()) / 1000;
    const velocity = 50;
    const carState: VehicleState = {
      position: {
        x: duration * velocity,
        y: 500,
      },
      angle: 0,
    };

    const background = [
      someBackground(),
    ];

    const graphic = [
      aGrid,
      vehicle(carOptions, carState),
    ];

    const overlay = [
      clock(),
      ledger(),
      debugInfo(),
    ];

    background.forEach(r => r.render(ctx, frameCount, mousePosition));

    graphic.forEach(r => r.render(ctx, frameCount, mousePosition));

    overlay.forEach(r => r.render(ctx, frameCount, mousePosition));
  }

  return (
    <div className="h-lvh p-4">
      <main className="flex flex-col items-center h-full">
        <Canvas draw={draw} />
      </main>
    </div>
  );
}
