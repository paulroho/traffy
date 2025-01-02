import { Renderable } from "../Renderable";

export function clock(): Renderable {
  return {
    render: ctx => {
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
  };
}
