import { Position, Size, Vector2d, WorldExtent, WorldPosition, WorldRectangle } from "@/domain/basics";

export class Mapper {
  private readonly _scale: Vector2d;
  private readonly _offset: Vector2d;

  constructor(worldCenterPosition: WorldPosition, canvas: Size, scaleWorldToDevice: number) {
    this._offset = {
      x: canvas.width / 2 - scaleWorldToDevice * worldCenterPosition.east,
      y: canvas.height / 2 - -scaleWorldToDevice * worldCenterPosition.north
    };
    this._scale = {
      x: scaleWorldToDevice,
      y: -scaleWorldToDevice
    };
  }

  get scale(): Vector2d {
    return this._scale;
  }

  get offset(): Vector2d {
    return this._offset;
  }

  getWorldPosition(position: Position): WorldPosition {
    return {
      east: (position.x - this._offset.x) / this._scale.x,
      north: (position.y - this._offset.y) / this._scale.y,
    };
  }

  getWorldExtent(size: Size): WorldExtent {
    return {
      east: size.width / this._scale.x,
      north: size.height / Math.abs(this._scale.y),
    };
  }

  getVisibleWorldRectangle(canvas: Size): WorldRectangle {
    return {
      westSouthCorner: this.getWorldPosition({
        x: 0,
        y: canvas.height
      }),
      extent: this.getWorldExtent({
        width: canvas.width,
        height: canvas.height
      }),
    };
  }
}
