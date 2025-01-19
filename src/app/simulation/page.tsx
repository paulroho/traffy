'use client'

import Canvas from "@/components/Canvas";
import { Position, WorldPosition } from "@/domain/basics";
import clock from "@/visualization/components/dev-tools/clock";
import debugInfo from "@/visualization/components/dev-tools/debugInfo";
import grid from "@/visualization/components/dev-tools/grid";
import someBackground from "@/visualization/components/dev-tools/someBackground";
import ledger from "@/visualization/components/dev-tools/ledger";
import renderableVehicle from "@/visualization/components/vehicle";
import { Renderable } from "@/visualization/basics";
import { World } from "@/domain/World";
import { Mapper } from "./Mapper";
import road from "@/visualization/components/road";

export default function Simulation() {
  const world = new World(new Date());
  world.setup();

  const worldAtCenter: WorldPosition = {
    east: 2500,
    north: 4000,
  };

  const scaleWorldToDevice = 1 / 1;

  const gridOptions = {
    interval: {
      westEast: 100,
      southNorth: 50,
    },
  };

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number, mousePosition: Position) => {
    const canvasSize = {
      width: ctx.canvas.width,
      height: ctx.canvas.height
    }

    const moveadd = world.millisecondsSinceStarted / 100;
    const movedWorldAtCenter: WorldPosition = {
      east: worldAtCenter.east + moveadd,
      north: worldAtCenter.north + moveadd,
    }
    const zoomedScale = scaleWorldToDevice * (1 + world.millisecondsSinceStarted / 10000);
    const mapper = new Mapper(movedWorldAtCenter, canvasSize, zoomedScale);
    // const mapper = new Mapper(worldAtCenter, canvasSize, scaleWorldToDevice);

    const render = (layer: Renderable[]) => {
      layer.forEach(r => r.render(ctx, frameCount, mousePosition, mapper));
    }

    render(getBackgroundLayer());

    ctx.save();
    ctx.translate(mapper.offset.x, mapper.offset.y);
    ctx.scale(mapper.scale.x, mapper.scale.y);

    render([{
      render: (ctx) => {
        ctx.lineWidth = 10;
        ctx.strokeRect(1000, 2000, 3000, 4000);
        ctx.strokeRect(1500, 6000, 2000, 1000);
        ctx.lineWidth = 1;
      }
    }]);
    // render([{
    //   render: (ctx) => {
    //     drawPoint(ctx, {x:movedWorldAtCenter.east, y:movedWorldAtCenter.north}, "CENTER");
    //     function drawPoint(ctx: CanvasRenderingContext2D, position: Position, info: string) {
    //       ctx.beginPath();Ì
    //       ctx.arc(position.x, position.y, 50, 0, 2 * Math.PI);
    //       ctx.fillStyle = "#444";
    //       ctx.fill();

    //       // ctx.font = "20rem sans-serif";
    //       // ctx.fillText(info, position.x + 5, position.y + 5);
    //     }
    //   }
    // }]);
    render(getGraphicLayer());

    ctx.restore();

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
      road(world.aRoad),
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
