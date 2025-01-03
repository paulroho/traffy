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
  turnAngle: number,
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

    drawWheels(ctx);

    ctx.restore();
  }

  function drawWheels(ctx: CanvasRenderingContext2D) {
    const rearTiresX = 0.2 * options.length;
    const frontTiresX = 0.8 * options.length;

    drawWheel(ctx, { x: frontTiresX, y: 0 }, state.turnAngle);
    drawWheel(ctx, { x: frontTiresX, y: options.width }, state.turnAngle);
    drawWheel(ctx, { x: rearTiresX, y: 0 }, 0);
    drawWheel(ctx, { x: rearTiresX, y: options.width }, 0);
  }

  function drawWheel(ctx: CanvasRenderingContext2D, position: Coordinates, angle: number) {
    const width = 10;
    const diameter = 20;

    ctx.save();

    ctx.translate(position.x, position.y);
    ctx.rotate(angle);
    ctx.translate(- diameter / 2, - width / 2);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, diameter, width);

    ctx.restore();
  }

  function drawReferencePoint(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
  }
}