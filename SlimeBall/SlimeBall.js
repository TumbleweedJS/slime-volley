/**
 * Created with JetBrains WebStorm.
 * User: Zodoh
 * Date: 20/11/12
 * Time: 02:52
 * To change this template use File | Settings | File Templates.
 */

function SlimeBall(x, y, x_min, x_max, y_max) {
	this.radius = 13;
	this.x_min = x_min;
	this.x_max = x_max;
	this.y_max = y_max;
	this.movement = new TW.Math.Vector2D(0, 0);
	this.position = new TW.Math.Vector2D(x, y);
	this.collision = new TW.Collision.CollisionCircle(x + this.radius, y + this.radius, this.radius);
	this.sprite = new TW.Graphic.Sprite({x: x, y: y, width: 25, height: 25});
	this.time = 0;
}

SlimeBall.prototype.reverseBounce = function(collision) {
	while (this.collision.isCollidingBox(collision)) {
		this.collision.x -= this.movement.x / 10;
		this.collision.y -= this.movement.y / 10;
	}
	this.position.x = this.collision.x - this.radius;
	this.position.y = this.collision.y - this.radius;
	this.sprite.setPosition(this.position.x, this.position.y);

	this.movement.x *= -1;
	this.movement.y *= -1;
};

SlimeBall.prototype.move = function(collision_player, collision_ia, collision_net) {

	this.position = this.position.add(this.movement);
	if (this.position.x > this.x_max) {
		this.position.x = this.x_max;
		this.movement.x *= -1;
	} else if (this.position.x < this.x_min) {
		this.position.x = this.x_min;
		this.movement.x *= -1;
	}
	if (this.movement.y < 20) {
		this.movement.y += 1;
	}
	this.sprite.setPosition(this.position.x, this.position.y);
	this.collision.x = this.position.x + this.radius;
	this.collision.y = this.position.y + this.radius;

	if (this.collision.isCollidingCircle(collision_player)) {
		this.bounce(collision_player);
	} else if (this.collision.isCollidingCircle(collision_ia)) {
		this.bounce(collision_ia);
	} else if (this.collision.isCollidingBox(collision_net)) {
		this.reverseBounce(collision_net);
	}
};

SlimeBall.prototype.bounce = function(collision) {
	if (this.collision.y > collision.y) {
		return;
	}
	while (this.collision.isCollidingCircle(collision)) {
		this.collision.x -= this.movement.x / 10;
		this.collision.y -= this.movement.y / 10;
	}
	this.position.x = this.collision.x - this.radius;
	this.position.y = this.collision.y - this.radius;
	this.sprite.setPosition(this.position.x, this.position.y);

	var normal = new TW.Math.Vector2D(this.collision.x - collision.x, this.collision.y - collision.y);
	var vector = new TW.Math.Vector2D(-normal.y, normal.x);
	var dp1 = this.movement.dotProduct(vector);
	var dp2 = this.movement.dotProduct(normal);
	var proj1 = new TW.Math.Vector2D(dp1 * (vector.x / vector.getLength()), dp1 * (vector.y / vector.getLength()));
	var proj2 = new TW.Math.Vector2D(dp2 * (normal.x / normal.getLength()), dp2 * (normal.y / normal.getLength()));
	proj2 = proj2.mult(-1);

	this.movement = proj1.add(proj2);
	this.movement = this.movement.div(this.movement.getLength() / 25);
};

SlimeBall.prototype.reset = function (x) {
	this.movement.x = 0;
	this.movement.y = -10;
	this.position.x = x;
	this.position.y = 100;
	this.collision.x = this.position.x + this.radius;
	this.collision.y = this.position.y + this.radius;
	this.time = 0;
};

SlimeBall.prototype.update = function(collision_player, collision_ia, collision_net) {
	var date = new Date();
	if (this.time === 0) {
		this.move(collision_player, collision_ia, collision_net);
		this.time = date.valueOf();
	} else {
		var count = (date.valueOf() - this.time);
		count /= 20;
		if (count > 1) {
			this.time = date.valueOf();
		}
		for (count; count > 1; count--) {
			this.move(collision_player, collision_ia, collision_net);
		}
	}
};