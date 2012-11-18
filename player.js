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

player.prototype.update = function() {
	if (this.type === "PLAYER") {
		if (keyboard.getState("KEY_A") === TW.Event.KeyboardInput.KEY_PRESSED) {
			this.moveleft();
		}
		if (keyboard.getState("KEY_D") === TW.Event.KeyboardInput.KEY_PRESSED) {
			this.moveright();
		}
	} else if (this.type === "IA") {
		if (ball.img.x > 360) {
			if (ball.collision.x < this.collision.x - 50) {
				this.moveleft();
			}
			else if (ball.collision.x > this.collision.x + 50) {
				this.moveright();
			}
		}
		else if (this.img.x < 600) {
			this.moveright();
		} else if (this.img.x > 600) {
			this.moveleft();
		}
	}
};