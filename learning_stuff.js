const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
};

canvas.addEventListener("mousedown", function (event) {
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
  spawnBubbles();
});

canvas.addEventListener("mouseup", function () {
  mouse.click = false;
  coords.x = mouse.x;
  coords.y = mouse.y;
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

class Line {
  constructor(x, y, x2, y2, width, color) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.width = width;
    this.color = color;
  }
  draw() {
    c.lineWidth = this.width;
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.x2, this.y2);
    c.strokeStyle = this.color;
    c.stroke();
  }
  update() {
    this.draw();
  }
}

const bubbles_array = [];
const lines_array = [];

function spawnBubbles() {
  const co = `hsl(${Math.random() * 360}, 50%, 50%)`;
  let x = Math.random() * canvas.width; // * (1000 - 80) + 80;
  let y = Math.random() * canvas.height; // * (1000 - 80) + 80;
  let r = Math.random() * (50 - 8) + 8;
  bubbles_array.push(new Bubble(x, y, r, co));
}

function spawnLines(x, y, x2, y2) {
  color = "red";
  w = 10;
  lines_array.push(new Line(x, y, x2, y2, w, color));
}

const coords = {
  x: 0,
  y: 0,
};

function getCoords(x, y) {
  coords.x = x;
  coords.y = y;
}

function drawLine(x, y, x2, y2) {
  c.lineWidth = 10;
  c.beginPath();
  c.moveTo(x, y);
  c.lineTo(x2, y2);
  c.strokeStyle = "red";
  c.stroke();
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.1)";
  // c.fillRect(0, 0, canvas.width, canvas.height);
  bubbles_array.forEach((Bubble, index) => {
    console.log("spawnLines ~ lines_array", lines_array);

    Bubble.update();
    if (Bubble.isHovered() === true) {
      drawLine(Bubble.x, Bubble.y, coords.x, coords.y);
      getCoords(Bubble.x, Bubble.y);
      console.log("coords", coords);
    }
  });
  lines_array.forEach((Line, index) => {
    Line.update();
  });
}

animate();
