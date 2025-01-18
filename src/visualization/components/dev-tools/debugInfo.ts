import { Renderable } from "../../basics";

export default function debugInfo(): Renderable {
  return {
    render: (ctx, frameCount, _, mapper) => {
      ctx.save();

      ctx.font = "1.5rem sans-serif";
      ctx.strokeStyle = "white";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      const visibleWorldSize = mapper.visibleWorld.size;
      ctx.fillStyle = "white";
      ctx.fillText(visibleWorldSize.westEast.toFixed(0) + 'm x ' + visibleWorldSize.southNorth.toFixed(0) + 'm', 8, 8);

      ctx.fillStyle = "#aaa";
      ctx.fillText(ctx.canvas.width + ' x ' + ctx.canvas.height, 8, 40);

      ctx.textAlign = "right";
      ctx.strokeText(frameCount + '', ctx.canvas.width - 8, 8);

      ctx.restore();
    }
  };
}
