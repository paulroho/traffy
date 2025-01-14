import { Mapper } from "@/app/simulation/Mapper";
import { Renderable } from "../../basics";
import { WorldPosition } from "@/domain/basics";

export default function ledger(): Renderable {
  return {
    render: (ctx, _, { x, y }, mapper) => {
      ctx.save();

      drawLedger(ctx, x, y);
      showPosition(ctx, x, y, mapper);

      ctx.restore();
    }
  }

  function showPosition(ctx: CanvasRenderingContext2D, x: number, y: number, mapper: Mapper) {
    const worldPos: WorldPosition = {
      east: (x - mapper.offset.x) / mapper.scale.x,
      north: (y - mapper.offset.y) / mapper.scale.y,
    }
    const text = (+worldPos.east).toFixed(0) + ', ' + (+worldPos.north).toFixed(0);

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