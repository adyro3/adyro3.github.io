const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
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
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
const friction = 0.98; // the lower the number, the more friction, the faster the particles stop
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }
  draw() {
    c.save(); // c.save() and c.restore() used like a block to draw what's specified between only for the particle
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= friction; // adding friction to the particles
    this.velocity.y *= friction;
    this.x = this.x + this.velocity.x; // adding velocity to the particles
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}

const x = canvas.width / 2;
const y = canvas.height / 2;
const player = new Player(x, y, 20, "white"); // creating the Player object from the player class

const projectiles = []; // empty arrays to spawn projectiles, enemies and particles
const enemies = [];
const particles = [];

function spawnEnmemis() {
  setInterval(() => {
    // spawn enemmies every second
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
    enemies.push(new Enemy(x, y, radius, color, velocity)); // adding new enemy object to enemies array
  }, 1000);
}
let animationId;
function animate() {
  animationId = requestAnimationFrame(animate); //looping through animate until stopping when animationId is set to cancelAnimationFrame
  c.fillStyle = "rgba(0,0,0,0.1)"; // gets that nice effect due to background
  c.fillRect(0, 0, canvas.width, canvas.height); // clears the background every loop
  player.draw(); // draws player object from draw function in Player class

  particles.forEach((particle, index) => {
    // if particle no longer visible, cuts from array
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
    }
  });

  projectiles.forEach((projectile, index) => {
    // checks all projectiles in the array too see if offscreen
    projectile.update();
    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        // setTimeout to 0 removes the object right away
        projectiles.splice(index, 1); // cuts the projectile from the array
      }, 0);
    }
  });
  enemies.forEach((enemy, index) => {
    enemy.update();
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y); // check distance between enemy and player
    // end game
    if (dist - enemy.radius - player.radius < 1) {
      // checks if distance is <1 ( if enemy and player touch)
      cancelAnimationFrame(animationId); // stops the game (animationId is set to requestAnimationFrame)
    }
    projectiles.forEach((projectile, projectileIndex) => {
      // checks if each projectile is touching an enemy
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

      // when projectiles touch enemys
      if (dist - enemy.radius - projectile.radius < 1) {
        //create explosions
        for (let i = 0; i <= enemy.radius * 2; i++) {
          // creates many particles based on enemy size
          particles.push(
            // adds particle objects to the particles array
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2,
              enemy.color, // same color as the nemey
              {
                x: (Math.random() - 0.5) * (Math.random() * 4),
                y: (Math.random() - 0.5) * (Math.random() * 4),
              }
            )
          );
        }
        if (enemy.radius - 10 > 5) {
          // if radius is bigger, enemy gets smaller, if radius smaller, enemy gets cut from the enemies array
          gsap.to(enemy, {
            radius: enemy.radius - 10, // makes the enemy smaller if particle touches enemy
          });
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        } else {
          setTimeout(() => {
            enemies.splice(index, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      }
    });
  });
}

window.addEventListener("click", (event) => {
  //gets x and y of the mouse and creates a new projectile in the arrat that's pushed (with velocity) towards the mouse position
  const angle = Math.atan2(
    // gets angle for velocity
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  const velocity = {
    // gets velocity from angle
    x: Math.cos(angle) * 4,
    y: Math.sin(angle) * 4,
  };
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "red", velocity)
  );
});

animate();
spawnEnmemis();
