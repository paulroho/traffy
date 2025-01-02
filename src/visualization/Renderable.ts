import { Coordinates } from "@/components/Canvas";

export type Renderable = {
  render: (context: CanvasRenderingContext2D, frameCount: number, mousePosition: Coordinates) => void;
};
