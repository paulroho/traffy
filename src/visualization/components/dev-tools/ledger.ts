import { Renderable } from "../../Renderable";

export default function ledger(): Renderable {
  return {
    render: (ctx, _, { x, y }) => {
      ctx.save();

      drawLedger(ctx, x, y);
      showPosition(ctx, x, y);

      ctx.restore();
    }
  }

  function showPosition(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const text = x + ', ' + y;

    ctx.font = "1rem sans-serif";
    ctx.fillStyle = "yellow";
    const metrics = ctx.measureText(text);
    ctx.textAlign = metrics.width < x ? "right" : "left";
    ctx.textBaseline = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent < y ? "bottom" : "top";
    ctx.fillText(text, x, y);
  }

  function drawLedger(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.beginPath();

    ctx.moveTo(0, y);
    ctx.lineTo(ctx.canvas.width, y);

    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);

    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}