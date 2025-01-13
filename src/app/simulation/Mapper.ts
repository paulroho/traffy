import { Size, Vector2d, WorldPosition } from "@/domain/basics";

export class Mapper {
  constructor(
    public readonly scale: Vector2d,
    public readonly offset: Vector2d) { }
}

export function createMapper(worldAtCenter: WorldPosition, canvas: Size, scaleWorldToDevice: number): Mapper {
  const kx = scaleWorldToDevice;
  const x0 = canvas.width / 2 - kx * worldAtCenter.east;

  const ky = -scaleWorldToDevice;
  const y0 = canvas.height / 2 - ky * worldAtCenter.north;

  return new Mapper({ x: kx, y: ky }, { x: x0, y: y0 });
}

