'use client'

import { KeyboardEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react";
import { Position } from "../domain/basics";

type CanvasProps = {
    draw: (ctx: CanvasRenderingContext2D, frameCount: number, mousePosition: Position) => void,
    onKeyDown: (key: string) => void,
};
export default function Canvas(props: CanvasProps) {
    const canvasRef = useRef(null);
    const [mouseClientCoords, setMouseClientCoords] = useState({ clientX: 0, clientY: 0 })

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;
        const context = canvas.getContext('2d')!;

        let frameId = 0;
        let frameCount = 0;

        const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
            const { left, top, width, height } = ctx.canvas.getBoundingClientRect();
            if (ctx.canvas.width !== width) {
                ctx.canvas.width = width;
            }
            if (ctx.canvas.height = height) {
                ctx.canvas.height = height;
            }

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            const mousePos: Position = {
                x: mouseClientCoords.clientX - left,
                y: mouseClientCoords.clientY - top,
            };
            props.draw(ctx, frameCount, mousePos);
        }

        const render = () => {
            draw(context, frameCount);
            frameCount++;
            frameId = window.requestAnimationFrame(render);
        };

        render();

        return () => {
            window.cancelAnimationFrame(frameId);
        }
    }, [props, mouseClientCoords]);

    const onMouseMove: MouseEventHandler<HTMLCanvasElement> = ($event) => {
        setMouseClientCoords({
            clientX: $event.clientX,
            clientY: $event.clientY
        });
    }

    const onKeyDown: KeyboardEventHandler<HTMLCanvasElement> =
        ($event) => props.onKeyDown($event.key);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full border-red-300 border-0"
            onMouseMove={onMouseMove}
            tabIndex={1}
            onKeyDown={onKeyDown}
        ></canvas>
    );
}