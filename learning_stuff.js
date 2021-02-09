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
  console.log(mouse.x, mouse.y);
  isHovered();
  const radius = Math.random() * (50 - 8) + 8; // of random size(radius) between 50 and 8
  let x;
  let y;
  if (Math.random() < 0.5) {
    // random way to spawn off the screen
    x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
    // ternary opreator: if random is less than 0.5, spawn enemy to the left side, if more than 0,5 spawn enemy to right side
    y = Math.random() * canvas.height;
  } else {
    x = Math.random() * canvas.width;
    y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
  }
  const color = `hsl(${Math.random() * 360}, 50%, 50%)`; // radom color
  const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x); // getting the angle towards the player
  const velocity = {
    x: Math.cos(angle), // calculating the velocity towards the player based on angle
    y: Math.sin(angle),
  };
  bubbles_array.push(new Bubble(x, y, radius, color));
  console.log(bubbles_array);
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
}

const bubbles_array = [];

let x1 = 100;
let y1 = 100;
let x2 = 500;
let y2 = 500;
const bubble1 = new Bubble(x1, y1, 50, 'blue');
const bubble2 = new Bubble(x2, y2, 70, 'green');

function isHovered() {
  if (Math.hypot(bubble1.x - mouse.x, bubble1.y - mouse.y) < 50) {
    // return true;
    console.log('Inside');
  } else {
    //return false;
    console.log('Outside');
  }
}

function animate() {
  animationId = requestAnimationFrame(animate); //looping through animate until stopping when animationId is set to cancelAnimationFrame
  c.fillStyle = 'rgba(0,0,0,0.1)'; // gets that nice effect due to background
  c.fillRect(0, 0, canvas.width, canvas.height); // clears the background every loop
  bubble1.update();
  bubble2.update();
}

animate();
