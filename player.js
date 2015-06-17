(function () {
	function Player(xpos, ypos, width, height) {
		this.image = "star",
			this.width = width,
			this.height = height,
			this.x = xpos,
			this.y = ypos,
			this.speed = 4,
			this.velX = 0,
			this.velY = 0,
			this.inAir = false,
			this.landed = false;
	}
	Player.prototype.update = function () {
		//Code that manipulates the index 
	}
	Player.prototype.render = function (ctx) {
		//Code that will deal with drawing
		//		ctx.fillStyle = "red";
		//		ctx.fillRect(player.x, player.y, player.width, player.height);
		var img = document.getElementById("star");
		ctx.drawImage(img, player.x, player.y, player.width, player.height)
	}
	Player.prototype.moveRight = function () {
		if (player.velX < player.speed) {
			player.velX++;
		}
		console.log("Right")
	}
	Player.prototype.moveLeft = function () {
		if (player.velX > -player.speed) {
			player.velX--;
		}
		console.log("Left")
	}
	Player.prototype.jump = function () {
		//		if (!player.inAir) {
		player.inAir = true;
		player.velY = -player.speed * 2;
		console.log("Jumping")

		//		}
	}

	window.Player = Player;
})();