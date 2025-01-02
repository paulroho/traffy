'use client'

import { useEffect, useRef } from "react";

type CanvasProps = {
    draw: (ctx:CanvasRenderingContext2D, frameCount:number) => void,
};

export default function Canvas(props: CanvasProps) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;
        const context = canvas.getContext('2d')!;

        let frameId = 0;
        let frameCount = 0;

        const draw = (ctx:CanvasRenderingContext2D, frameCount:number) => {
            const { width, height } = ctx.canvas.getBoundingClientRect();
            if (ctx.canvas.width !== width) {
                ctx.canvas.width = width;
            }
            if (ctx.canvas.height = height) {
                ctx.canvas.height = height;
            }

            props.draw(ctx, frameCount);
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
    }, [props]);

    return (
        <canvas ref={canvasRef} className="w-full h-full border-red-300 border-2"></canvas>
    );
}