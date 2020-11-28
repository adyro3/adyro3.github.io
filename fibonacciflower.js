const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let size = 0;
let positionX = 0;
let positionY = 0;

function drawFlower() {
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'blues';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(positionX, positionY, size, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  size += 0.05;
  positionX += 0.5;
  positionY += 0.5;
  drawFlower();
  requestAnimationFrame(animate);
}

animate();
