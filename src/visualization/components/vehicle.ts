import { Coordinates } from "@/components/Canvas";
import { Renderable } from "../Renderable";

export type VehicleOptions = {
  length: number,
  width: number,
  color: string,
}
export type VehicleState = {
  position: Coordinates,
  angle: number,
}
export default function vehicle(options: VehicleOptions, state: VehicleState): Renderable {
  return {
    render: ctx => {
      ctx.save();

      ctx.translate(state.position.x, state.position.y);
      ctx.rotate(state.angle);

      drawVehicle(ctx);
      drawReferencePoint(ctx);

      ctx.restore();
    }
  }

  function drawVehicle(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.translate(-options.length / 2, -options.width / 2);

    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, options.length, options.width);

    ctx.fillStyle = options.color;
    ctx.fillRect(0, 0, options.length, options.width);

    ctx.restore();
  }

  function drawReferencePoint(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
  }
}