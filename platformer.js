const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Cube {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}
	draw() {
		// ctx.save();
		ctx.beginPath();
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		// ctx.closePath();
		// ctx.restore();
	}
	update() {
		this.draw();
		this.x += 1;
	}
}

class Player {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}
	draw() {
		// ctx.save();

		ctx.beginPath();
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		// ctx.closePath();
		// ctx.restore();
	}
	update() {
		this.draw();
	}
}

class Terrain {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}
	draw() {
		// ctx.save();
		ctx.beginPath();
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		// ctx.closePath();
		// ctx.restore();
	}
}
cube1 = new Cube(10, 100, 50, 50, "blue");
player = new Player(50, 400, 40, 100, "yellow");
floor = new Terrain(0, 600, canvas.width, 70, "gray");

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
	requestAnimationFrame(animate);
	clearCanvas();
	cube1.draw();
	cube1.update();
	player.draw();
	player.update();
	floor.draw();
}

animate();

console.log(canvas);
