import { Renderable } from "../../basics";

type GridOptionsDimension = {
    start: number,
    end: number,
    interval: number,
};
type GridOptions = {
    interval: {
        westEast: number,
        southNorth: number,
    },
};

export default function grid(options: GridOptions): Renderable {
    function* positions(options: GridOptionsDimension) {
        const interval = options.interval;
        const start = Math.floor(options.start / interval) * interval;

        for (let pos = start; pos <= options.end; pos += interval) {
            yield pos;
        }
    };

    return {
        render: (ctx, _, __, mapper) => {
            const southWestCorner = mapper.visibleWorld.southWestCorner;
            const northEastCorner = {
                east: mapper.visibleWorld.southWestCorner.east + mapper.visibleWorld.size.westEast,
                north: mapper.visibleWorld.southWestCorner.north + mapper.visibleWorld.size.southNorth,
            }
            const interval = options.interval;

            ctx.beginPath();

            for (const east of positions({
                start: southWestCorner.east,
                end: northEastCorner.east,
                interval: interval.westEast,
            })) {
                ctx.moveTo(east, southWestCorner.north);
                ctx.lineTo(east, northEastCorner.north);
            }

            for (const north of positions({
                start: southWestCorner.north,
                end: northEastCorner.north,
                interval: interval.southNorth,
            })) {
                ctx.moveTo(southWestCorner.east, north);
                ctx.lineTo(northEastCorner.east, north);
            }

            ctx.stroke();
        }
    }
}