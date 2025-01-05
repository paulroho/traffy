import { Position } from "@/domain/basics";
import { Renderable } from "../basics";
import { Vehicle } from "@/domain/Vehicle";

export default function renderableVehicle(vehicle: Vehicle): Renderable {
  const rearOverhang = vehicle.options.overhangRelative.rear * vehicle.options.length;
  const wheelbaseRelative = 1 - (vehicle.options.overhangRelative.rear + vehicle.options.overhangRelative.front);
  const wheelbase = wheelbaseRelative * vehicle.options.length;
  const veryBack = -rearOverhang;
  const options = vehicle.options;
  const state = vehicle.state;

  return {
    render: ctx => {
      ctx.save();

      ctx.translate(state.placement.position.x, state.placement.position.y);
      ctx.rotate(state.placement.angle);

      drawReferencePoint(ctx);
      drawVehicle(ctx);

      ctx.restore();
    }
  }

  function drawVehicle(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.translate(-rearOverhang, -options.width / 2);

    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, options.length, options.width);

    ctx.fillStyle = options.color;
    ctx.fillRect(0, 0, options.length, options.width);

    ctx.restore();

    ctx.translate(0, -options.width / 2);

    drawWheels(ctx);
    drawLights(ctx);
  }

  function drawWheels(ctx: CanvasRenderingContext2D) {
    drawWheel(ctx, { x: 0, y: 0 }, 0);
    drawWheel(ctx, { x: 0, y: options.width }, 0);
    drawWheel(ctx, { x: wheelbase, y: 0 }, state.turnAngle);
    drawWheel(ctx, { x: wheelbase, y: options.width }, state.turnAngle);
  }

  function drawWheel(ctx: CanvasRenderingContext2D, position: Position, angle: number) {
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

  function drawLights(ctx: CanvasRenderingContext2D) {
    drawHeadlights(ctx);
    drawTaillights(ctx);
  }

  function drawHeadlights(ctx: CanvasRenderingContext2D) {
    const width = 12;
    const length = 10;
    const offsetAcross = 4;

    ctx.beginPath();
    ctx.fillStyle = "#ffffbb";

    ctx.fillRect(
      veryBack + options.length - length + 1, offsetAcross,
      length, width);
    ctx.fillRect(
      veryBack + options.length - length + 1, options.width - width - offsetAcross,
      length, width);

    ctx.fill();
  }

  function drawTaillights(ctx: CanvasRenderingContext2D) {
    const radius = 6;
    const offsetAcross = 8;
    const offsetLength = -2;

    ctx.beginPath();
    ctx.fillStyle = "#aa0000";

    ctx.arc(
      veryBack + offsetLength, offsetAcross,
      radius, 3 * Math.PI / 2, Math.PI / 2);
    ctx.arc(
      veryBack + offsetLength, options.width - offsetAcross,
      radius, 3 * Math.PI / 2, Math.PI / 2);

    ctx.fill();
  }

  function drawReferencePoint(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
  }
}