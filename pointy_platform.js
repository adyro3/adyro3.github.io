const canvas = document.getElementById('canvas1');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    c.beginPath();
    c.rect(this.x, this.y, 150, 50);
    c.fillStyle = 'blue';
    c.fill();
  }

  update() {
    this.draw();
  }
}

class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    c.beginPath();
    c.rect(this.x, this.y, 150, 50);
    c.fillStyle = 'blue';
    c.fill();
  }

  update() {
    this.draw();
  }
}

const platforms = [];
const player = new Player();
// const x = 150;
// const y = 150;

function makeGround() {
  c.beginPath();
  c.rect(0, canvas.height - 100, canvas.width, 50);
  c.fillStyle = 'green';
  c.fill();
}

function spawnPlatforms() {
  //setInterval(() => {
  let x = Math.random() * 1000;
  let y = Math.random() * 1000;
  platforms.push(new Platform(x, y));
  console.log('//setInterval ~ platforms', platforms);
  // }, 1000);
}

function animate() {
  requestAnimationFrame(animate);

  c.fillStyle = 'rgba(0,0,0,0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  makeGround();
  player.update();
  platforms.forEach((platform) => {
    platform.update();
  });
}

animate();
spawnPlatforms();
