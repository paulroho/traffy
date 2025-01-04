import { Renderable } from "../../basics";

export default function debugInfo(): Renderable {
  return {
    render: (ctx, frameCount) => {
      ctx.save();

      ctx.font = "2rem sans-serif";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "white";
      ctx.textBaseline = "top";

      ctx.textAlign = "left";
      ctx.fillText(ctx.canvas.width + 'x' + ctx.canvas.height, 10, 10);

      ctx.textAlign = "right";
      ctx.strokeText(frameCount + '', ctx.canvas.width - 10, 10);

      ctx.restore();
    }
  };
}
