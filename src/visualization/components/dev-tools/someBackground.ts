import { Renderable } from "../../Renderable";

export function someBackground(): Renderable {
  return {
    render: ctx => {
      ctx.fillStyle = '#ff3456';
      ctx.fillRect(10, 10, ctx.canvas.width - 20, ctx.canvas.height - 20);
    }
  };
}
