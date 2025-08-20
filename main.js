// main.js

const canvas = document.getElementById('centroidCanvas');
const ctx = canvas.getContext('2d');
const POINT_COUNT = 7;
const POINT_RADIUS = 6;
const CENTROID_RADIUS = 8;

function randomPoints(count, width, height, margin = 40) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * (width - 2 * margin) + margin,
    y: Math.random() * (height - 2 * margin) + margin
  }));
}

function computeCentroid(points) {
  const n = points.length;
  const sum = points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  return { x: sum.x / n, y: sum.y / n };
}

function draw(points, centroid) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw dotted lines from each point to centroid
  ctx.save();
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = '#888';
  points.forEach(p => {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(centroid.x, centroid.y);
    ctx.stroke();
  });
  ctx.restore();

  // Draw points
  points.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, POINT_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = '#1976d2';
    ctx.fill();
    ctx.strokeStyle = '#0d47a1';
    ctx.stroke();
  });

  // Draw centroid
  ctx.beginPath();
  ctx.arc(centroid.x, centroid.y, CENTROID_RADIUS, 0, 2 * Math.PI);
  ctx.fillStyle = '#e53935';
  ctx.fill();
  ctx.strokeStyle = '#b71c1c';
  ctx.stroke();
}

function generateAndDraw() {
  const points = randomPoints(POINT_COUNT, canvas.width, canvas.height);
  const centroid = computeCentroid(points);
  draw(points, centroid);
}

document.getElementById('newExample').onclick = generateAndDraw;

generateAndDraw();
