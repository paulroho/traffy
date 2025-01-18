import { Position, Size, Vector2d, WorldExtent, WorldPosition, WorldRectangle } from "@/domain/basics";

export class Mapper {
  constructor(
    public readonly scale: Vector2d,
    public readonly offset: Vector2d) { }

  getWorldPosition(position: Position): WorldPosition {
    return {
      east: (position.x - this.offset.x) / this.scale.x,
      north: (position.y - this.offset.y) / this.scale.y,
    };
  }

  getWorldExtent(size: Size): WorldExtent {
    return {
      east: size.width / this.scale.x,
      north: size.height / Math.abs(this.scale.y),
    };
  }

  getVisibleWorldRectangle(canvas: Size): WorldRectangle {
    return {
      westSouthCorner: this.getWorldPosition({ x: 0, y: canvas.height }),
      extent: this.getWorldExtent({ width: canvas.width, height: canvas.height }),
    };
  }
}

export function createMapper(worldCenterPosition: WorldPosition, canvas: Size, scaleWorldToDevice: number): Mapper {
  const kx = scaleWorldToDevice;
  const x0 = canvas.width / 2 - kx * worldCenterPosition.east;

  const ky = -scaleWorldToDevice;
  const y0 = canvas.height / 2 - ky * worldCenterPosition.north;

  return new Mapper({ x: kx, y: ky }, { x: x0, y: y0 });
}

