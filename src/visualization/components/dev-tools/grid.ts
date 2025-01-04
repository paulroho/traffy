import { Renderable } from "../../basics";

type GridOptionsDimension = {
    start: number,
    end: number,
    interval: number,
};
type GridOptions = {
    x: GridOptionsDimension,
    y: GridOptionsDimension,
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
        render: ctx => {
            ctx.beginPath();

            for (const x of positions(options.x)) {
                ctx.moveTo(x, options.y.start);
                ctx.lineTo(x, options.y.end);
            }

            for (const y of positions(options.y)) {
                ctx.moveTo(options.x.start, y);
                ctx.lineTo(options.x.end, y);
            }

            ctx.stroke();
        }
    }
}