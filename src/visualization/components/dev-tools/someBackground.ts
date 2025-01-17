import { Renderable } from "../../basics";

export default function someBackground(): Renderable {
  const padding = 0;
  return {
    render: ctx => {
      ctx.fillStyle = '#128834';
      ctx.fillRect(
        padding, padding,
        ctx.canvas.width - 2 * padding, ctx.canvas.height - 2 * padding
      );
    }
  };
}
