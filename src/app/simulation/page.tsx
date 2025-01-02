'use client'

import Canvas from "@/components/Canvas";

export default function Simulation() {
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle='#ff3456';
    ctx.fillRect(10, 10, ctx.canvas.width-20, ctx.canvas.height-20);
    ctx.strokeText(frameCount + '', 50, 50);
}
  return (
    <div className="h-lvh p-4">
      <main className="flex flex-col items-center h-full">
        <Canvas draw={draw}/>
      </main>
    </div>
  );
}
