'use client'

import { useEffect, useRef } from "react";

type VisualizationProps = {
    draw: (ctx:CanvasRenderingContext2D, frameCount:number) => void,
};

export default function Visualization(props: VisualizationProps) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;
        const context = canvas.getContext('2d')!;

        let frameId = 0;
        let frameCount = 0;
    
        const render = () => {
            props.draw(context, frameCount);
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