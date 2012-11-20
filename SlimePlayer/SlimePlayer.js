/**
 * Created with JetBrains WebStorm.
 * User: Zodoh
 * Date: 20/11/12
 * Time: 01:17
 * To change this template use File | Settings | File Templates.
 */

function SlimePlayer(x, y, x_min, x_max, type) {
	this.type = type;
	this.radius = 50;
	this.y_max = y;
	this.x_min = x_min;
	this.x_max = x_max;
	this.movement = new TW.Math.Vector2D(0, 0);
	this.position = new TW.Math.Vector2D(x, y);
	this.collision = new TW.Collision.CollisionCircle(x + this.radius, y + this.radius, this.radius);
	this.sprite = new TW.Graphic.Sprite({x: x, y: y, width: 100, height: 50});
	this.jumping = false;
}

SlimePlayer.prototype.move = function() {

	this.position = this.position.add(this.movement);
	if (this.position.x > this.x_max) {
		this.position.x = this.x_max;
	} else if (this.position.x < this.x_min) {
		this.position.x = this.x_min;
	}
	if (this.position.y > this.y_max) {
		this.position.y = this.y_max;
		this.movement.y = 0;
		this.jumping = false;
	}
	this.sprite.setPosition(this.position.x, this.position.y);
	this.collision.x = this.position.x + this.radius;
	this.collision.y = this.position.y + this.radius;
};

SlimePlayer.prototype.jump = function() {
	if (this.jumping === false) {
		this.movement.y = -30;
		this.jumping = true;
	}
};

SlimePlayer.prototype.update = function(object) {
	if (this.type === "PLAYER") {
		if (object.getState("KEY_LEFT") === TW.Event.KeyboardInput.KEY_PRESSED) {
			this.movement.x = -20;
		} else if (object.getState("KEY_RIGHT") === TW.Event.KeyboardInput.KEY_PRESSED) {
			this.movement.x = 20;
		} else {
			this.movement.x = 0;
		}
		if (object.getState("KEY_SPACE") === TW.Event.KeyboardInput.KEY_PRESSED || object.getState("KEY_UP") === TW.Event.KeyboardInput.KEY_PRESSED) {
			this.jump();
		}
	} else if (this.type === "IA") {
		if (object.collision.x > this.collision.x + 15 || (object.collision.x < 400 && this.collision.x < 650) && object.collision.x > 400) {
			this.movement.x = 20;
		} else if (object.collision.x < this.collision.x - 15 && object.collision.x > 400) {
			this.movement.x = -20;
		} else {
			this.movement.x = 0;
		}
		if (object.collision.x > 400 && this.collision.y - object.collision.y < 200 && this.collision.x < 740 && this.collision.y - object.collision.y > 50) {
			this.jump();
		}

	}
	if (this.jumping) {
		this.movement.y += 3;
	}

	this.move();
};