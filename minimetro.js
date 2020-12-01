const canvas = document.getElementById('canvas1');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Station {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, 50, 0, Math.PI * 2);
    c.fillStyle = 'blue';
    c.fill();
  }

  update() {
    this.draw();
  }
}
let x = Math.random() * (500 - 80) + 80;
let y = Math.random() * (500 - 80) + 80;
const stations = [];
const rando = 5;
const test = new Station(x, y);

function spawnStations() {
  setInterval(() => {
    let x = Math.random() * canvas.width; // * (1000 - 80) + 80;
    let y = Math.random() * canvas.height; // * (1000 - 80) + 80;
    stations.push(new Station(x, y));
  }, 1000);
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0,0,0,0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  stations.forEach((station) => {
    station.update();
  });
}

animate();
spawnStations();
