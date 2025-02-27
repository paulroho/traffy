import { angleWorld, distanceWorld, intersectWorld, RoadSegment, subtractWorld, WorldLine, WorldPosition } from "@/domain/basics";
import { Renderable } from "../basics";

export default function road(segments: RoadSegment[]): Renderable {
    return {
        render: (ctx) => {
            let prevSegment: RoadSegment | undefined;
            segments.forEach(s => {
                const length = distanceWorld(s.to, s.from);
                const angle = angleWorld(s.to, s.from) + Math.PI;   // TODO: Why is this necessary?

                if (prevSegment !== undefined) {
                    drawCurve(ctx, prevSegment, s);
                }

                ctx.save();

                ctx.translate(s.from.east, s.from.north);
                ctx.rotate(angle);

                ctx.beginPath();

                ctx.fillStyle = "gray";
                ctx.fillRect(
                    0, -s.width / 2,
                    length, s.width,
                )

                ctx.moveTo(0, -s.width / 2);
                ctx.lineTo(length, -s.width / 2);

                ctx.moveTo(0, s.width / 2);
                ctx.lineTo(length, s.width / 2);

                ctx.stroke();

                ctx.restore();

                prevSegment = s;
            });
        }
    };

    function drawCurve(ctx: CanvasRenderingContext2D, road1: RoadSegment, road2: RoadSegment) {
        const line1: WorldLine = {
            position: road1.from,
            direction: subtractWorld(road1.from, road1.to)
        };
        // const pos11 = addWorld(line1.position, multWorld(line1.direction, -2));
        // const pos12 = addWorld(line1.position, multWorld(line1.direction, +1));
        const line2: WorldLine = {
            position: road2.from,
            direction: subtractWorld(road2.from, road2.to)
        };
        // const pos21 = addWorld(line2.position, multWorld(line2.direction, -2));
        // const pos22 = addWorld(line2.position, multWorld(line2.direction, +1));

        ctx.save();
        // drawCircle(ctx, line1.position, "gray", 20);
        // drawCircle(ctx, line2.position, "white", 10);
        // drawCircle(ctx, pos11, "yellow", 20);
        // drawCircle(ctx, pos12, "orange", 10);
        // drawCircle(ctx, pos21, "darkorange", 20);
        // drawCircle(ctx, pos22, "red", 10);
        // ctx.beginPath();
        // ctx.strokeStyle = "black";
        // ctx.lineWidth = 2;
        // ctx.setLineDash([10, 10]);
        // ctx.moveTo(pos11.east, pos11.north);
        // ctx.lineTo(pos12.east, pos12.north);
        // ctx.moveTo(pos21.east, pos21.north);
        // ctx.lineTo(pos22.east, pos22.north);
        // ctx.stroke();
        // ctx.restore();

        const intersection = intersectWorld(line1, line2);

        console.log([intersection.east, intersection.north]);

        ctx.save();
        drawCircle(ctx, intersection, "red", 2);
        ctx.restore();
    }

    function drawCircle(ctx: CanvasRenderingContext2D, position: WorldPosition, stroke: string, radius: number) {
        ctx.beginPath();
        ctx.arc(position.east, position.north, radius, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = stroke;
        ctx.stroke();
    }
}
