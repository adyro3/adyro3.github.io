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
});

class Station {
  constructor(x, y, r, co) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.co = co;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    c.fillStyle = 'blue';
    c.fill();
  }

  update() {
    this.draw();
  }
}
let x = Math.random() * (500 - 80) + 80;
let y = Math.random() * (500 - 80) + 80;
const co = `hsl(${Math.random() * 360}, 50%, 50%)`;
const stations = [];
// const rando = 5;
// const test = new Station(x, y, r, c);

function spawnStations() {
  setInterval(() => {
    let x = Math.random() * canvas.width; // * (1000 - 80) + 80;
    let y = Math.random() * canvas.height; // * (1000 - 80) + 80;
    let r = Math.random() * (50 - 8) + 8;
    stations.push(new Station(x, y, r, co));
  }, 1000);
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0,0,0,0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  stations.forEach((Station) => {
    Station.update();
  });
}

function calcDistance() {
  let distance;
  distance = Math.sqrt(
    Math.pow(mouse.x - Station.x, 2) + Math.pow(mouse.y - Station.y, 2)
  );
  return distance;
}

function isHovered() {
  if (calcDistance() < Station.r) return true;
  else return false;
}

function drawLine() {}

animate();
spawnStations();
