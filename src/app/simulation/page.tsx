'use client'

import Canvas from "@/components/Canvas";
import { clock } from "@/visualization/components/clock";
import { debugInfo } from "@/visualization/components/debugInfo";
import grid from "@/visualization/components/grid";
import { someBackground } from "@/visualization/components/someBackground";

export default function Simulation() {
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    const aGrid = grid({
      x: {
        start: 0,
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
      debugInfo(),
      aGrid,
      clock(),
    ];

    graphic.forEach(r => r.render(ctx, frameCount));
  }

  return (
    <div className="h-lvh p-4">
      <main className="flex flex-col items-center h-full">
        <Canvas draw={draw} />
      </main>
    </div>
  );
}
