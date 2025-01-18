import { Position, Size, Vector2d, WorldSize, WorldPosition, WorldExtent } from "@/domain/basics";

export class Mapper {
  private readonly _scale: Vector2d;
  private readonly _offset: Vector2d;
  private readonly _canvas: Size;

  constructor(worldCenterPosition: WorldPosition, canvas: Size, scaleWorldToDevice: number) {
    this._canvas = canvas;
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

  get visibleWorld(): WorldExtent {
    return {
      westSouthCorner: this.getWorldPosition({
        x: 0,
        y: this._canvas.height
      }),
      size: this.visibleWorldSize,
    };
  }

  get visibleWorldSize(): WorldSize {
    return {
      westEast: this._canvas.width / this._scale.x,
      southNorth: this._canvas.height / Math.abs(this._scale.y),
    };
  }
}
