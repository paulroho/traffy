'use client'

import Canvas, { Coordinates } from "@/components/Canvas";
import { clock } from "@/visualization/components/dev-tools/clock";
import { debugInfo } from "@/visualization/components/dev-tools/debugInfo";
import grid from "@/visualization/components/dev-tools/grid";
import { someBackground } from "@/visualization/components/dev-tools/someBackground";

export default function Simulation() {
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

    const graphic = [
      someBackground(),
      aGrid,
      clock(),
      debugInfo(),
    ];

    graphic.forEach(r => r.render(ctx, frameCount, mousePosition));
  }

  return (
    <div className="h-lvh p-4">
      <main className="flex flex-col items-center h-full">
        <Canvas draw={draw} />
      </main>
    </div>
  );
}
