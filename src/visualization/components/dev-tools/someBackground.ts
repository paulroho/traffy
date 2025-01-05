import { Renderable } from "../../basics";

export default function someBackground(): Renderable {
  return {
    render: ctx => {
      ctx.fillStyle = '#128834';
      ctx.fillRect(10, 10, ctx.canvas.width - 20, ctx.canvas.height - 20);
    }
  };
}
