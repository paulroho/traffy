'use client'

import { useCallback, useEffect, useRef } from "react";

export default function Visualization() {
    const canvasRef = useRef(null);

    const draw = useCallback((ctx: CanvasRenderingContext2D, frameCount: number) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle='#ff3456';
        ctx.fillRect(10, 10, ctx.canvas.width-20, ctx.canvas.height-20);
        ctx.strokeText(frameCount + '', 50, 50);
    }, []);

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;
        const context = canvas.getContext('2d')!;

        let frameId = 0;
        let frameCount = 0;
    
        const render = () => {
            draw(context, frameCount);
            frameCount++;
            frameId = window.requestAnimationFrame(render);
        };

        render();

        return () => {
            window.cancelAnimationFrame(frameId);
        }
    }, [draw]);

    return (
        <canvas ref={canvasRef} className="w-full h-full border-red-300 border-2"></canvas>
    );
}