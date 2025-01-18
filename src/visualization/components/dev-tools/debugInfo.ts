import { WorldRectangle } from "@/domain/basics";
import { Renderable } from "../../basics";

export default function debugInfo(): Renderable {
  return {
    render: (ctx, frameCount, _, mapper) => {
      ctx.save();

      ctx.font = "1.5rem sans-serif";
      ctx.strokeStyle = "white";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      const visibleWorld = mapper.visibleWorld;
      ctx.fillStyle = "white";
      ctx.fillText(visibleWorld.size.westEast.toFixed(0) + 'm x ' + visibleWorld.size.southNorth.toFixed(0) + 'm', 8, 8);

      ctx.fillStyle = "#aaa";
      ctx.fillText(ctx.canvas.width + ' x ' + ctx.canvas.height, 8, 40);

      ctx.textAlign = "right";
      ctx.strokeText(frameCount + '', ctx.canvas.width - 8, 8);

      ctx.restore();
    }
  };
}
