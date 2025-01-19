import { angleWorld, distanceWorld, RoadSegment } from "@/domain/basics";
import { Renderable } from "../basics";

export default function road(segments: RoadSegment[]): Renderable {
    return {
        render: (ctx) => {
            segments.forEach(s => {
                const length = distanceWorld(s.to, s.from);
                const angle = angleWorld(s.to, s.from) + Math.PI;   // TODO: Why is this necessary

                ctx.save();

                ctx.translate(s.from.east, s.from.north);
                ctx.rotate(angle);

                ctx.beginPath();

                ctx.fillStyle = "gray";
                ctx.fillRect(
                    0, -s.width/2,
                    length, s.width,
                )

                ctx.moveTo(0, -s.width/2);
                ctx.lineTo(length, -s.width/2);

                ctx.moveTo(0, s.width/2);
                ctx.lineTo(length, s.width/2);

                ctx.stroke();

                ctx.restore();
            });
        }
    };
}