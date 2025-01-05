import { Position } from "@/domain/basics";
import { Renderable } from "../basics";
import { Vehicle } from "@/domain/Vehicle";

export default function renderableVehicle(vehicle: Vehicle): Renderable {
  const options = vehicle.options;
  const state = vehicle.state;

  return {
    render: ctx => {
      ctx.save();

      ctx.translate(state.placement.position.x, state.placement.position.y);
      ctx.rotate(state.placement.angle);

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
    drawLights(ctx);

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
    ctx.beginPath();
    ctx.arc(options.length + 2, 9, 9, Math.PI / 2, 3 * Math.PI / 2);
    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(options.length + 2, 41, 9, Math.PI / 2, 3 * Math.PI / 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
  }

  function drawTaillights(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(-2, 8, 6, 3 * Math.PI / 2, Math.PI / 2);
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(-2, 42, 6, 3 * Math.PI / 2, Math.PI / 2);
    ctx.fillStyle = "red";
    ctx.fill();
  }

  function drawReferencePoint(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
  }
}