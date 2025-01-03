import { Coordinates } from "@/components/Canvas";
import { Renderable } from "../Renderable";

export type VehicleOptions = {
  length: number,
  width: number,
}
export type VehicleState = {
  position: Coordinates,
  angle: number,
}
export default function vehicle(options: VehicleOptions, state: VehicleState): Renderable {
  return {
    render: ctx => {
      ctx.save();

      ctx.lineWidth = 3;
      ctx.translate(state.position.x, state.position.y);
      ctx.rotate(state.angle);

      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();

      ctx.translate(-options.length / 2, -options.width / 2);
      ctx.strokeRect(0, 0, options.length, options.width);

      ctx.restore();
    }
  }
}