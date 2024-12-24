import { RefObject, useEffect, useState } from 'react';

const canvasProperties = {
  width: window.innerWidth <= 600 ? window.innerWidth : window.innerWidth - 300,
  height: window.innerHeight,
};
const canvasWidth = canvasProperties.width <= 960 ? canvasProperties.width : 960;
const canvasHeight = canvasProperties.height <= 720 ? canvasProperties.height : 720;
const canvasStage = {
  width: canvasWidth,
  height: canvasHeight,
  origin: {
    x: (canvasProperties.width - canvasWidth) / 2,
    y: (canvasProperties.height - canvasHeight) / 2,
  },
};

type Point = {
  x: number;
  y: number;
};
type Path = Point[];
type Shapes = Path[];
// const shapes: Shapes = [];
// const path: Path = [];

export default function useBoard(canvasRef: RefObject<HTMLCanvasElement>) {
  console.log({ canvasProperties, canvasStage });
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;
  const [shapes, setShapes] = useState<Shapes>([]);
  const [path, setPath] = useState<Path>([]);
  console.log({ shapes });
  useEffect(() => {
    canvas?.addEventListener('pointerdown', (event) => onPointerDownListener(event, canvas, ctx));
  }, [canvas]);

  useEffect(() => {
    clearCanva(ctx);
  }, [ctx]);

  function clearCanva(ctx: CanvasRenderingContext2D) {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasProperties.width, canvasProperties.height);
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvasProperties.width, canvasProperties.height);
    // ctx.fillStyle = 'white';
    // ctx.fillRect(canvasStage.origin.x, canvasStage.origin.y, canvasStage.width, canvasStage.height);
  }

  function onPointerDownListener(event: MouseEvent, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    setPath([{ x: event.offsetX, y: event.offsetY }]);
    console.log('a');
    ctx.strokeStyle = 'rgba(255,255,255,1)';
    ctx.lineWidth = 2;
    ctx.moveTo(event.offsetX, event.offsetY);
    ctx.beginPath();

    canvas.addEventListener('pointermove', (event) => onPointerMoveListener(event, ctx));
    canvas.addEventListener('pointerup', () => onPointerUpListener(canvas, ctx));
  }

  function onPointerMoveListener(event: MouseEvent, ctx: CanvasRenderingContext2D) {
    setPath((old) => [...old, { x: event.offsetX, y: event.offsetY }]);
    draw(ctx, event);
  }
  function onPointerUpListener(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    setShapes((old) => [...old, path]);
    canvas.removeEventListener('pointermove', (event) => onPointerMoveListener(event, ctx));
    canvas.removeEventListener('pointerup', () => onPointerUpListener(canvas, ctx));
  }
  function draw(ctx: CanvasRenderingContext2D, event: MouseEvent) {
    ctx.lineTo(event.offsetX, event.offsetY);
  }
}
