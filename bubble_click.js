const canvas = document.getElementById('canvas1');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
};

canvas.addEventListener('mousedown', function (event) {
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
  spawnBubbles();
});

class Bubble {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // a circle
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    this.draw();
  }
  isHovered() {
    if (Math.hypot(this.x - mouse.x, this.y - mouse.y) < this.radius)
      return true;
    else return false;
  }
}

const bubbles_array = [];

function spawnBubbles() {
  const co = `hsl(${Math.random() * 360}, 50%, 50%)`;
  let x = Math.random() * canvas.width; // * (1000 - 80) + 80;
  let y = Math.random() * canvas.height; // * (1000 - 80) + 80;
  let r = Math.random() * (50 - 8) + 8;
  bubbles_array.push(new Bubble(x, y, r, co));
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0,0,0,0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  bubbles_array.forEach((Bubble, index) => {
    Bubble.update();
    if (Bubble.isHovered() === true) {
      bubbles_array.splice(index, 1);
    }
  });
}

animate();
