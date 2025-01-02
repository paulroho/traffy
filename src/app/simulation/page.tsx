'use client'

import Canvas from "@/components/Canvas";

export default function Simulation() {
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    someBackground(ctx);
    debugInfo(ctx, frameCount);
    clock(ctx);
  }

  return (
    <div className="h-lvh p-4">
      <main className="flex flex-col items-center h-full">
        <Canvas draw={draw} />
      </main>
    </div>
  );

  function someBackground(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ff3456';
    ctx.fillRect(10, 10, ctx.canvas.width - 20, ctx.canvas.height - 20);
  }

  function debugInfo(ctx: CanvasRenderingContext2D, frameCount: number) {
    ctx.save();

    ctx.font = "2rem sans-serif";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.textBaseline = "top";

    ctx.textAlign = "right";
    ctx.strokeText(frameCount + '', ctx.canvas.width - 10, 10);

    ctx.textAlign = "left";
    ctx.fillText(ctx.canvas.width + 'x' + ctx.canvas.height, 10, 10);

    ctx.restore();
  }

  function clock(ctx: CanvasRenderingContext2D) {
    const center = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2
    };

    ctx.save();

    ctx.font = "2rem sans-serif";
    ctx.translate(center.x, center.y);

    const now = new Date();

    ctx.rotate(2 * Math.PI * (now.getSeconds() + now.getMilliseconds() / 1000) / 60);

    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -100);
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(now.toLocaleTimeString(), 0, 0);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(center.x, center.y, 4, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
  }
}
