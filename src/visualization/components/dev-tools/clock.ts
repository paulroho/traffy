import { Renderable } from "../../basics";

export default function clock(): Renderable {
  const secondsHandLength = 100;

  return {
    render: ctx => {
      const center = {
        x: ctx.canvas.width / 2,
        y: ctx.canvas.height - secondsHandLength
      };

      ctx.save();

      ctx.translate(center.x, center.y);

      const now = new Date();

      const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
      ctx.rotate(2 * Math.PI * seconds / 60);

      drawSecondsHand(ctx);
      drawTime(ctx, now);

      ctx.restore();

      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(center.x, center.y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  function drawSecondsHand(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -secondsHandLength);
    ctx.stroke();
  }

  function drawTime(ctx: CanvasRenderingContext2D, now: Date) {
    ctx.font = "2rem sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(now.toLocaleTimeString(), 0, 0);
  }
}
