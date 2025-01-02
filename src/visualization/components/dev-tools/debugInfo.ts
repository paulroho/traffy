import { Renderable } from "../../Renderable";

export function debugInfo(): Renderable {
  return {
    render: (ctx, frameCount, {x, y}) => {
      ctx.save();

      ctx.font = "2rem sans-serif";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "white";
      ctx.textBaseline = "top";

      ctx.textAlign = "left";
      ctx.fillText(ctx.canvas.width + 'x' + ctx.canvas.height, 10, 10);

      ctx.textAlign = "center";
      ctx.fillText('(' + x + ', ' + y + ')', ctx.canvas.width/2, 10);

      ctx.textAlign = "right";
      ctx.strokeText(frameCount + '', ctx.canvas.width - 10, 10);

      ctx.restore();
    }
  };
}
