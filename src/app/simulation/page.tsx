'use client'

import Canvas from "@/components/Canvas";

export default function Simulation() {
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    const center = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2
    };

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#ff3456';
    ctx.fillRect(10, 10, ctx.canvas.width - 20, ctx.canvas.height - 20);

    ctx.font = "30px sans-serif";
    ctx.textBaseline = "alphabetic";

    ctx.save();

    ctx.translate(center.x, center.y);
    
    const now = new Date();

    ctx.rotate(2 * Math.PI * (now.getSeconds() + now.getMilliseconds()/1000)/60);

    ctx.lineWidth = 5;
    ctx.lineCap = "round"
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -100);
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(now.toLocaleTimeString(), 0, 0);

    ctx.restore();

    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(ctx.canvas.width + 'x' + ctx.canvas.height, 10, 40);
    ctx.restore();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(center.x, center.y, 4, 0, 2 * Math.PI);
    ctx.fill();

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
