'use client'

import Canvas from "@/components/Canvas";
import { clock } from "@/visualization/components/clock";
import { debugInfo } from "@/visualization/components/debugInfo";
import { someBackground } from "@/visualization/components/someBackground";

export default function Simulation() {
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    const graphic = [
      someBackground(),
      debugInfo(),
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
