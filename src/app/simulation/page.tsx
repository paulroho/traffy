'use client'

import Canvas from "@/components/Canvas";

export default function Simulation() {
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#ff3456';
    ctx.fillRect(10, 10, ctx.canvas.width - 20, ctx.canvas.height - 20);

    ctx.font = "30px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(ctx.canvas.width + 'x' + ctx.canvas.height, 10, 40);
    ctx.textAlign = "right";
    ctx.strokeText(frameCount + '', ctx.canvas.width - 10, 40);
  }

  return (
    <div className="h-lvh p-4">
      <main className="flex flex-col items-center h-full">
        <Canvas draw={draw} />
      </main>
    </div>
  );
}
