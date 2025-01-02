import { Renderable } from "../../Renderable";

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
        for (let pos = options.start; pos <= options.end; pos += options.interval) {
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