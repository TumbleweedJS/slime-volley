/**
 * Created with JetBrains WebStorm.
 * User: NABOT
 * Date: 11/13/12
 * Time: 5:50 PM
 * To change this template use File | Settings | File Templates.
 */

function player(x_min, x_max, type) {
	this.move = 20;
	this.img = null;
	this.collision = null;
	this.score = 0;
	this.x_min = x_min;
	this.x_max = x_max;
	this.type = type;
	this.vy = null;
};

player.prototype.moveleft = function() {
	if (this.img.x - this.move >= this.x_min) {
		this.img.x -= this.move;
		this.collision.x -= this.move;
	} else if (this.img.x < this.x_min){
		this.img.x = this.x_min;
		this.collision.x = this.x_min + this.collision.radius;
	}
};

player.prototype.moveright = function() {
	if (this.img.x + this.move <= this.x_max) {
		this.img.x += this.move;
		this.collision.x += this.move;
	} else if (this.img.x > this.x_max){
		this.img.x = this.x_max;
		this.collision.x = this.x_max - this.collision.radius;
	}
};

player.prototype.init_jump = function() {

	if (this.vy === null) {
		this.vy = -15;
	}
};

player.prototype.jump = function() {
	this.img.y += this.vy;
	this.collision.y += this.vy;

	if (this.vy !== null) {
		this.vy += 1;
	}

	if (this.img.y > 350) {
		this.img.y = 350;
		this.collision.y = 400;
		this.vy = null;
	}
}

player.prototype.update = function() {
	if (this.type === "PLAYER") {
		if (keyboard.getState("KEY_A") === TW.Event.KeyboardInput.KEY_PRESSED) {
			this.moveleft();
		}
		if (keyboard.getState("KEY_D") === TW.Event.KeyboardInput.KEY_PRESSED) {
			this.moveright();
		}
		if (keyboard.getState("KEY_W") === TW.Event.KeyboardInput.KEY_PRESSED) {
			this.init_jump();
		}

	} else if (this.type === "IA") {
		if (ball.img.x > 360) {
			if (ball.collision.x < this.collision.x - 15 && ball.img.x > 425) {
				this.moveleft();
			}
			else if (ball.collision.x > this.collision.x + 15) {
				this.moveright();
			}
		}
		else if (this.img.x < 600) {
			this.moveright();
		} else if (this.img.x > 600) {
			this.moveleft();
		}
	}
	this.jump();
};