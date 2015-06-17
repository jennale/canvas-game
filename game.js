// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	width = $(window).width(),
	height = $(window).height()-50,
	player = new Player(width / 2 - 15, height / 2 - 15, 50, 50),
	keys = [],
	friction = 0.9,
	gravity = 0.4,
	platforms = [];

var background = new Background(50, width, height)
platforms.push({
	x: width / 2 - 100,
	y: height - 80,
	width: 200,
	height: height
});
platforms.push({
	x: width / 3 - 100,
	y: height - 180,
	width: 200,
	height: height
});
platforms.push(
{
	x: width / 4 - 100,
	y: height - 280,
	width: 200,
	height: height
})

canvas.width = width;
canvas.height = height;

var lastTime;

function main() {
	var now = Date.now();
	var dt = (now - lastTime) / 1000.0;

	update(dt); //Update object information
	updateBackground();
	draw(); //Draw objects based on new information

	lastTime = now;
	requestAnimFrame(main);
}

function updateBackground() {
	ctx.clearRect(0, 0, width, height);
	background.render(ctx)
}

function update(dt) {
	//keep track of game time
	//keep track of score
	//Handle inputs
	keyboardHandler(); //Apply changes based on inputs
	//keep track of sprites positions
	player.x += player.velX;
	player.velX *= friction; //Friction slows the object
	player.y += player.velY;
	player.velY += gravity; //Apply gravity 
	//check for collisions
	checkBorderCollisions()
	checkPlatformCollisions();
}

function draw() {
	player.render(ctx)
	ctx.fillStyle = "#b7d2ea";
	ctx.beginPath();

	for (var i = 0; i < platforms.length; i++) {
		ctx.rect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
	}
	ctx.fill();
}

function checkBorderCollisions() {
	if (player.x >= width - player.width) {
		player.x = width - player.width;
	} else if (player.x <= 0) {
		player.x = 0;
	}
	if (player.y >= height - player.height) {
		player.y = height - player.height;
		player.inAir = false;
	}
}

function checkPlatformCollisions() {
	player.landed = false;
	for (var i = 0; i < platforms.length; i++) {
		var direction = colCheck(player, platforms[i]);
		if (direction === "l" || direction === "r") {
			player.velX = 0;
			player.inAir = false;
		} else if (direction === "b") {
			player.landed = true;
			player.inAir = false;
		} else if (direction === "t") {
			player.velY *= -gravity;
//			player.inAir = true;
//			player.landed = false;
		}
	}
	if (player.landed) {
		player.velY = 0;
	}
}

window.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true;
});

window.addEventListener("keyup", function (e) {
	keys[e.keyCode] = false;
});

window.addEventListener("load", function () {
	main();
});