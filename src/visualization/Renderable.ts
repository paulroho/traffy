export type Renderable = {
  render: (context: CanvasRenderingContext2D, frameCount: number) => void;
};
