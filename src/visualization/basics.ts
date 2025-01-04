import { Position } from "@/domain/basics";

export interface Renderable {
  render(context: CanvasRenderingContext2D, frameCount: number, mousePosition: Position): void;
};
