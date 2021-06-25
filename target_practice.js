const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.addEventListener("mousedown", doMouseDown, false);

let positionX = canvas.width / 2;
let positionY = canvas.height / 2;
let lungime = 50;
let inaltime = 50;
let dx = 1;
let dy = -1;
let dreapta = positionX + lungime;
let sus = positionY + inaltime;
let x = 0;

// if () {
//     x = 1;
// }

function doMouseDown() {
  x = 1;
}

function drawRect() {
  ctx.beginPath();
  ctx.fillRect(positionX, positionY, lungime, inaltime);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
  positionX += dx;
  positionY += dy;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (x == 0) {
    drawRect();
  }
  if (positionX + lungime > canvas.width || lungime > positionX + lungime) {
    dx = -dx;
  }
  if (positionY + inaltime > canvas.height || inaltime > positionY + inaltime) {
    dy = -dy;
  }
  positionX += dx;
  positionY += dy;

  requestAnimationFrame(animate);
}
// setInterval(draw, 10);
animate();
