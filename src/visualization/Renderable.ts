import { Coordinates } from "@/components/Canvas";

export interface Renderable {
  render(context: CanvasRenderingContext2D, frameCount: number, mousePosition: Coordinates): void;
};
