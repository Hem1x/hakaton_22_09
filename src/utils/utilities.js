export const drawRect = (detections, ctx) => {
  // Loop through each prediction
  detections.forEach((prediction) => {
    // const bbox = Object.values(prediction['bbox']);

    // Extract boxes and classes
    const [x, y, width, height] = prediction['bbox'];
    const text = prediction['class'];

    // Set styling
    const color = Math.floor(Math.random() * 16777215).toString(16);
    ctx.strokeStyle = '#000';
    ctx.font = '18px Arial';

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};
