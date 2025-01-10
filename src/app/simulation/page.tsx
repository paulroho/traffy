'use client'

import Canvas from "@/components/Canvas";
import { Position } from "@/domain/basics";
import clock from "@/visualization/components/dev-tools/clock";
import debugInfo from "@/visualization/components/dev-tools/debugInfo";
import grid from "@/visualization/components/dev-tools/grid";
import someBackground from "@/visualization/components/dev-tools/someBackground";
import ledger from "@/visualization/components/dev-tools/ledger";
import renderableVehicle from "@/visualization/components/vehicle";
import { Renderable } from "@/visualization/basics";
import { World } from "@/domain/World";

export default function Simulation() {
  const world = new World(new Date());
  world.setup();

  const gridOptions = {
    x: {
      start: -250,
      end: 10000,
      interval: 500,
    },
    y: {
      start: -1000,
      end: +1000,
      interval: 100,
    }
  };

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number, mousePosition: Position) => {
    const render = (layer: Renderable[]) => {
      layer.forEach(r => r.render(ctx, frameCount, mousePosition));
    }

    render(getBackgroundLayer());

    // ctx.save();
    // ctx.translate(frameCount, 0);
    render(getGraphicLayer());
    // ctx.restore();

    render(getOverlayLayer());
  }

  const onKeyDown = (key: string) => {
    switch (key) {
      case "ArrowLeft": world.aVehicle.turnLeft();
        break;
      case "ArrowRight": world.aVehicle.turnRight();
        break;
      case "ArrowDown": world.aVehicle.break();
        break;
      case "ArrowUp": world.aVehicle.accelerate();
        break
    }
  }

  return (
    <div className="h-lvh p-4">
      <main className="flex flex-col items-center h-full">
        <Canvas
          draw={draw}
          onKeyDown={onKeyDown}
        />
      </main>
    </div>
  );

  function getBackgroundLayer() {
    return [
      someBackground(),
    ];
  }

  function getGraphicLayer() {
    world.advanceTo(new Date());

    return [
      grid(gridOptions),
      renderableVehicle(world.aVehicle),
    ];
  }

  function getOverlayLayer() {
    return [
      clock(),
      ledger(),
      debugInfo(),
    ];
  }
}
