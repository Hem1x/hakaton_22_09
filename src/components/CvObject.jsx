import { useEffect, useRef } from 'react';

const CvObject = ({ data, className, width, height }) => {
  const canvasRef = useRef(null);
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  const confidence = data.confidence.toFixed(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.fillRect(
      width * data.x - (data.width * width) / 2,
      height * data.y - (data.height * height) / 2 - 20,
      width * data.width,
      20,
    );
    ctx.strokeRect(
      width * data.x - (data.width * width) / 2,
      height * data.y - (data.height * height) / 2,
      width * data.width,
      height * data.height,
    );

    console.log(ctx);

    // Добавляем текст с информацией о классе и уверенности
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText(
      '  ' + data.class + ', ' + confidence,
      width * data.x - (data.width * width) / 2,
      height * data.y - (data.height * height) / 2 - 3,
    );

    return () => {};
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} z-10 h-full`}
      width={width}
      height={height}></canvas>
  );
};

export default CvObject;
